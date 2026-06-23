import { useState, useMemo, useEffect } from "react";

const API_BASE = "https://queue-ease-apis.onrender.com";

const authFetch = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);
  return data;
};

const MOCK_STAFF = [
  { id: "STF001", name: "Adaeze Okafor", email: "adaeze.okafor@queueease.com", phone: "+234 802 123 4567", role: "staff", department: "Immigration", status: "Active", joinedDate: "2026-01-12" },
  { id: "STF002", name: "Kwame Mensah", email: "kwame.mensah@queueease.com", phone: "+233 244 567 890", role: "staff", department: "Immigration", status: "Active", joinedDate: "2025-11-03" },
  { id: "STF003", name: "Ngozi Eze", email: "ngozi.eze@queueease.com", phone: "+234 805 987 6543", role: "staff", department: "Finance", status: "Active", joinedDate: "2026-02-20" },
  { id: "STF004", name: "Yaw Boateng", email: "yaw.boateng@queueease.com", phone: "+233 209 112 233", role: "staff", department: "Health", status: "Suspended", joinedDate: "2025-09-15" },
  { id: "STF005", name: "Chidinma Obi", email: "chidinma.obi@queueease.com", phone: "+234 701 445 9981", role: "admin", department: "Transport", status: "Active", joinedDate: "2025-07-01" },
];

const ROLES = ["staff", "admin"];
const DEPARTMENTS = ["Immigration", "Finance", "Health", "Transport", "Civil Registry"];
const PAGE_SIZE = 7;

const staffApi = {
  async list() {
    return authFetch("/api/staff");
  },
  async create(payload) {
    return authFetch("/api/staff", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  async updateRole(id, role) {
    return authFetch(`/api/staff/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },
  async update(id, payload) {
    return authFetch(`/api/staff/${id}/edit`, {
      method: "PATCH",
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        serviceId: payload.serviceId || null,
      }),
    });
  },
  async remove(id) {
    return authFetch(`/api/staff/${id}/delete`, { method: "DELETE" });
  },
};

function emptyForm() {
  return { 
    name: "", 
    email: "", 
    phone: "", 
    password: "", 
    role: ROLES[0], 
    department: DEPARTMENTS[0], 
    serviceId: "" };
}

function formFromStaff(s) {
  return {
    name: s.name,
    email: s.email,
    phone: s.phone,
    password: "",
    role: s.role,
    department: s.department,
    serviceId: s.serviceId || ""
  };
}

export default function ManagerStaffDashboard() {
  const [staff, setStaff] = useState(MOCK_STAFF);
  const [mode, setMode] = useState("list");
  const [activeStaffId, setActiveStaffId] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [removeTargetId, setRemoveTargetId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [page, setPage] = useState(1);

  const [form, setForm] = useState(emptyForm());
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    staffApi.list()
      .then(data => {
        const list = Array.isArray(data) ? data : data?.staff || data?.data || [];
        if (list.length > 0) setStaff(list);
      })
      .catch((err) => {
        console.error("Failed to load staff list:", err);
      });
  }, []);

  const stats = useMemo(() => {
    const total = staff.length;
    const active = staff.filter((s) => s.status === "Active").length;
    const suspended = staff.filter((s) => s.status === "Suspended").length;
    const admins = staff.filter((s) => s.role === "admin").length;
    return { total, active, suspended, admins };
  }, [staff]);

  const filteredStaff = useMemo(() => {
    return staff.filter((s) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "All Roles" || s.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [staff, searchTerm, roleFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / PAGE_SIZE));
  const pagedStaff = filteredStaff.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const removeTarget = useMemo(
    () => staff.find((s) => s.id === removeTargetId) || null,
    [staff, removeTargetId]
  );

  function openCreate() {
    setForm(emptyForm());
    setFormErrors({});
    setMode("create");
  }

  function openEdit(id) {
    const s = staff.find((st) => st.id === id);
    if (!s) return;
    setForm(formFromStaff(s));
    setFormErrors({});
    setActiveStaffId(id);
    setMode("edit");
  }

  function backToList() {
    setMode("list");
    setActiveStaffId(null);
    setFormErrors({});
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validateForm(isEdit) {
    const errors = {};
    if (!form.name.trim()) errors.name = "Full name is required";
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address";
    }
    if (!form.phone.trim()) errors.phone = "Phone number is required";
    if (!isEdit && !form.password?.trim()) errors.password = "Password is required";
    if (!form.role) errors.role = "Role is required";
    if (!form.department) errors.department = "Department is required";
    return errors;
  }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    const errors = validateForm(false);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const created = await staffApi.create({
        name: form.name, 
        email: form.email, 
        phone: form.phone,
       password: form.password, 
       role: form.role,
      serviceId: form.serviceId?.trim() || null,
    });
      setStaff((prev) => [created, ...prev]);
      backToList();
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const errors = validateForm(true);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    try {
      const original = staff.find((s) => s.id === activeStaffId);
      if (original && original.role !== form.role) {
        await staffApi.updateRole(activeStaffId, form.role);
      }
      await staffApi.update(activeStaffId, form);
      setStaff((prev) =>
        prev.map((s) => (s.id === activeStaffId ? { ...s, ...form, id: s.id } : s))
      );
      backToList();
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  function requestRemove(id) {
    setRemoveTargetId(id);
    setShowRemoveModal(true);
  }

  async function handleConfirmRemove() {
    setSubmitting(true);
    try {
      await staffApi.remove(removeTargetId);
      setStaff((prev) => prev.filter((s) => s.id !== removeTargetId));
      setShowRemoveModal(false);
      setRemoveTargetId(null);
    } catch (error) {
      console.error("Failed to remove staff member:", error);
      setActionError("Could not remove this officer. Please try again.");
      setShowRemoveModal(false);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleSuspend(id) {
    const target = staff.find((s) => s.id === id);
    if (!target) return;
    const nextStatus = target.status === "Active" ? "Suspended" : "Active";
    setSubmitting(true);
    try {
      await staffApi.update(id, { ...target, status: nextStatus });
      setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s)));
    } catch (err) {
      console.error("Failed to update staff status:", err);
      setActionError("Could not update this officer's status. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (mode === "list" && staff.length === 0) {
    return (
      <div className="stf-root">
        <StaffHeader
          title="Staff Management"
          subtitle="Manage officers and staff across your organization"
        />
        <div className="stf-empty">
          <div className="stf-empty-illustration" aria-hidden="true">
            <PeopleIllustration />
          </div>
          <h2 className="stf-empty-title">No Staff Added</h2>
          <p className="stf-empty-text">
            You have not added any officers yet.<br />
            Add your first officer to begin assigning queues
          </p>
          <button type="button" className="stf-btn stf-btn-primary" onClick={openCreate}>
            Add Officer
          </button>
        </div>
        <style>{STYLES}</style>
      </div>
    );
  }

  if (mode === "list") {
    return (
      <div className="stf-root">
        <StaffHeader
          title="Staff Management"
          subtitle="Manage officers and staff across your organization"
          action={
            <button type="button" className="stf-btn stf-btn-primary" onClick={openCreate}>
              Add Officer
            </button>
          }
        />

        {actionError && (
          <div className="stf-action-error" role="alert">
            {actionError}
            <button
              type="button"
              className="stf-action-error-dismiss"
              onClick={() => setActionError("")}
              aria-label="Dismiss error"
            >
              &times;
            </button>
          </div>
        )}

        <div className="stf-stats-row">
          <StatCard value={stats.total} label="Total Staff" tone="neutral" />
          <StatCard value={stats.active} label="Active Officers" tone="teal" />
          <StatCard value={stats.suspended} label="Suspended" tone="rose" />
          <StatCard value={stats.admins} label="Admins" tone="amber" />
        </div>

        <div className="stf-toolbar">
          <div className="stf-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
          </div>
          <select
            className="stf-select"
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          >
            <option>All Roles</option>
            {ROLES.map((r) => (<option key={r}>{r}</option>))}
          </select>
        </div>

        <div className="stf-table-wrap">
          <table className="stf-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedStaff.length === 0 ? (
                <tr>
                  <td colSpan={7} className="stf-table-empty">No staff match your search.</td>
                </tr>
              ) : (
                pagedStaff.map((s) => (
                  <tr key={s.id}>
                    <td className="stf-table-name">
                      <div className="stf-avatar">{initials(s.name)}</div>
                      {s.name}
                    </td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>{s.role}</td>
                    <td>{s.department || "—"}</td>
                    <td><StatusBadge status={s.status} /></td>
                    <td>
                      <div className="stf-row-actions">
                        <button type="button" className="stf-link-btn" onClick={() => openEdit(s.id)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="stf-link-btn"
                          onClick={() => handleToggleSuspend(s.id)}
                          disabled={submitting}
                        >
                          {s.status === "Active" ? "Suspend" : "Reactivate"}
                        </button>
                        <button
                          type="button"
                          className="stf-link-btn is-danger"
                          onClick={() => requestRemove(s.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="stf-pagination">
          <span>
            Showing {filteredStaff.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, filteredStaff.length)} of {filteredStaff.length} staff
          </span>
          <div className="stf-pagination-controls">
            <button
              type="button"
              className="stf-page-btn"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`stf-page-btn ${p === page ? "is-active" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="stf-page-btn"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              &rsaquo;
            </button>
          </div>
        </div>

        {showRemoveModal && removeTarget && (
          <RemoveModal
            name={removeTarget.name}
            onCancel={() => { setShowRemoveModal(false); setRemoveTargetId(null); }}
            onConfirm={handleConfirmRemove}
            submitting={submitting}
          />
        )}

        <style>{STYLES}</style>
      </div>
    );
  }

  if (mode === "create" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <div className="stf-root">
        <StaffHeader
          title={isEdit ? "Edit Officer" : "Add New Officer"}
          subtitle={
            isEdit
              ? "Update this officer's information and role"
              : "Add a new officer to your organization"
          }
        />

        <form
          className="stf-form"
          onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit}
          noValidate
        >
          <div className="stf-form-section">
            <div className="stf-form-section-header">
              <span className="stf-section-number">1</span>
              <h3>Officer Information</h3>
            </div>
            <div className="stf-form-section-body">
              <Field label="Full Name" error={formErrors.name} required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Adaeze Okafor"
                />
              </Field>
              <Field label="Email Address" error={formErrors.email} required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="adaeze.okafor@example.com"
                  disabled={isEdit}
                />
              </Field>
              <Field label="Phone Number" error={formErrors.phone} required>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder=" 080 000 0000"
                />
              </Field>
              {!isEdit && (
                <Field label="Password" error={formErrors.password} required>
                  <input
                    type="password"
                    value={form.password || ""}
                    onChange={(e) => updateField("password", e.target.value)}
                    placeholder="Temporary password"
                  />
                </Field>
              )}
              {!isEdit && (
                <Field label="Service ID" error={formErrors.serviceId}>
                  <input
                    type="text"
                    value={form.serviceId || ""}
                    onChange={(e) => updateField("serviceId", e.target.value)}
                    placeholder="Paste a valid Service UUID or leave blank"
                  />
                </Field>
              )}
            </div>
          </div>

          <div className="stf-form-section">
            <div className="stf-form-section-header">
              <span className="stf-section-number">2</span>
              <h3>Role and Department</h3>
            </div>
            <div className="stf-form-section-body">
              <Field label="Role" error={formErrors.role} required>
                <select value={form.role} onChange={(e) => updateField("role", e.target.value)}>
                  {ROLES.map((r) => (<option key={r} value={r}>{r}</option>))}
                </select>
              </Field>
              <Field label="Department" error={formErrors.department} required>
                <select value={form.department} onChange={(e) => updateField("department", e.target.value)}>
                  {DEPARTMENTS.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </Field>
            </div>
          </div>

          {formErrors.submit && (
            <div style={{ color: "#f43f5e", fontSize: 13, marginBottom: 12 }}>
              {formErrors.submit}
            </div>
          )}

          <div className="stf-form-actions">
            <button
              type="button"
              className="stf-btn stf-btn-outline"
              onClick={backToList}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="stf-btn stf-btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Add Officer"}
            </button>
          </div>
        </form>

        <style>{STYLES}</style>
      </div>
    );
  }

  backToList();
  return null;
}

function StaffHeader({ title, subtitle, action }) {
  return (
    <div className="stf-page-header">
      <div>
        <h1 className="stf-page-title">{title}</h1>
        <p className="stf-page-subtitle">{subtitle}</p>
      </div>
      <div className="stf-header-right">{action}</div>
    </div>
  );
}

function StatCard({ value, label, tone }) {
  return (
    <div className={`stf-stat-card tone-${tone}`}>
      <div className="stf-stat-value">{value}</div>
      <div className="stf-stat-label">{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === "Active" ? "is-active" : "is-suspended";
  return <span className={`stf-status-badge ${cls}`}>{status}</span>;
}

function Field({ label, required, error, children }) {
  return (
    <label className="stf-field">
      <span className="stf-field-label">
        {label}
        {required && <span className="stf-required">*</span>}
      </span>
      {children}
      {error && <span className="stf-field-error">{error}</span>}
    </label>
  );
}

function RemoveModal({ name, onCancel, onConfirm, submitting }) {
  return (
    <div className="stf-modal-overlay" role="dialog" aria-modal="true">
      <div className="stf-modal">
        <div className="stf-modal-icon">!</div>
        <h3 className="stf-modal-title">Remove Officer?</h3>
        <p className="stf-modal-text">
          {name} will lose access to this organization's queue system
        </p>
        <div className="stf-modal-actions">
          <button type="button" className="stf-btn stf-btn-outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="button" className="stf-btn stf-btn-danger" onClick={onConfirm} disabled={submitting}>
            {submitting ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PeopleIllustration() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <ellipse cx="90" cy="120" rx="70" ry="8" fill="var(--stf-mint-shadow)" />
      <circle cx="70" cy="55" r="24" fill="var(--stf-teal-soft)" />
      <circle cx="70" cy="40" r="14" fill="var(--stf-skin)" />
      <path d="M50 95 q20 -18 40 0 l-3 25 h-34 z" fill="var(--stf-teal)" />
      <circle cx="118" cy="60" r="18" fill="var(--stf-teal-soft)" opacity="0.7" />
      <circle cx="118" cy="48" r="10" fill="var(--stf-skin)" opacity="0.85" />
      <path d="M104 95 q14 -12 28 0 l-2 18 h-24 z" fill="var(--stf-teal-dark)" opacity="0.85" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const STYLES = `
.stf-root {
  --stf-teal: #14b8a6;
  --stf-teal-dark: #0d9488;
  --stf-teal-soft: #99f6e4;
  --stf-mint: #f0fdfa;
  --stf-mint-shadow: rgba(20, 184, 166, 0.12);
  --stf-rose: #f43f5e;
  --stf-rose-soft: #ffe4e6;
  --stf-amber: #f59e0b;
  --stf-amber-soft: #fef3c7;
  --stf-skin: #fcd9b8;
  --stf-border: #e2e8f0;
  --stf-text: #0f172a;
  --stf-text-muted: #64748b;
  background: var(--stf-mint);
  min-height: 100%;
  padding: 28px 32px 48px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--stf-text);
  box-sizing: border-box;
}
.stf-root * { box-sizing: border-box; }
.stf-page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}
.stf-page-title { font-size: 26px; font-weight: 700; margin: 0 0 6px; }
.stf-page-subtitle { margin: 0; color: var(--stf-text-muted); font-size: 14px; }
.stf-header-right { display: flex; align-items: center; gap: 12px; }
.stf-action-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: var(--stf-rose-soft);
  color: var(--stf-rose);
  border: 1px solid var(--stf-rose);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}
.stf-action-error-dismiss {
  background: none;
  border: none;
  color: var(--stf-rose);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0 4px;
}
.stf-btn {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease, transform 0.05s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.stf-btn:active { transform: translateY(1px); }
.stf-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.stf-btn-primary { background: var(--stf-teal); color: #fff; }
.stf-btn-primary:hover:not(:disabled) { background: var(--stf-teal-dark); }
.stf-btn-outline { background: #fff; color: var(--stf-text); border: 1px solid var(--stf-border); }
.stf-btn-outline:hover:not(:disabled) { background: #f8fafc; }
.stf-btn-danger { background: var(--stf-rose); color: #fff; }
.stf-btn-danger:hover:not(:disabled) { background: #e11d48; }
.stf-link-btn {
  background: none;
  border: none;
  color: var(--stf-teal-dark);
  font-weight: 600;
  cursor: pointer;
  font-size: 12.5px;
  padding: 0;
}
.stf-link-btn:hover:not(:disabled) { text-decoration: underline; }
.stf-link-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.stf-link-btn.is-danger { color: var(--stf-rose); }
.stf-row-actions { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.stf-empty {
  background: #fff;
  border-radius: 16px;
  padding: 64px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.stf-empty-illustration { margin-bottom: 24px; }
.stf-empty-title { font-size: 20px; font-weight: 700; margin: 0 0 10px; }
.stf-empty-text { color: var(--stf-text-muted); font-size: 14px; line-height: 1.6; margin: 0 0 28px; }
.stf-stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.stf-stat-card { background: #fff; border-radius: 12px; padding: 18px 20px; border: 1px solid var(--stf-border); }
.stf-stat-value { font-size: 26px; font-weight: 700; line-height: 1; }
.stf-stat-label { font-size: 13px; color: var(--stf-text-muted); margin-top: 6px; }
.stf-stat-card.tone-teal .stf-stat-value { color: var(--stf-teal-dark); }
.stf-stat-card.tone-rose .stf-stat-value { color: var(--stf-rose); }
.stf-stat-card.tone-amber .stf-stat-value { color: var(--stf-amber); }
.stf-stat-card.tone-neutral .stf-stat-value { color: var(--stf-text); }
.stf-toolbar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.stf-search {
  flex: 1;
  min-width: 220px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid var(--stf-border);
  border-radius: 8px;
  padding: 9px 14px;
  color: var(--stf-text-muted);
}
.stf-search input { border: none; outline: none; flex: 1; font-size: 14px; background: transparent; color: var(--stf-text); }
.stf-select {
  border: 1px solid var(--stf-border);
  border-radius: 8px;
  padding: 9px 14px;
  font-size: 14px;
  background: #fff;
  color: var(--stf-text);
  min-width: 150px;
}
.stf-table-wrap {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--stf-border);
  overflow-x: auto;
  margin-bottom: 16px;
}
.stf-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 720px; }
.stf-table th {
  text-align: left;
  padding: 14px 18px;
  color: var(--stf-text-muted);
  font-weight: 600;
  border-bottom: 1px solid var(--stf-border);
  white-space: nowrap;
}
.stf-table td { padding: 14px 18px; border-bottom: 1px solid var(--stf-border); white-space: nowrap; }
.stf-table tr:last-child td { border-bottom: none; }
.stf-table-name { font-weight: 600; display: flex; align-items: center; gap: 10px; }
.stf-table-empty { text-align: center; color: var(--stf-text-muted); padding: 32px 0; }
.stf-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--stf-mint-shadow);
  color: var(--stf-teal-dark);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}
.stf-status-badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
.stf-status-badge.is-active { background: var(--stf-mint-shadow); color: var(--stf-teal-dark); }
.stf-status-badge.is-suspended { background: var(--stf-rose-soft); color: var(--stf-rose); }
.stf-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  color: var(--stf-text-muted);
}
.stf-pagination-controls { display: flex; gap: 6px; }
.stf-page-btn {
  border: 1px solid var(--stf-border);
  background: #fff;
  border-radius: 6px;
  min-width: 30px;
  height: 30px;
  font-size: 13px;
  cursor: pointer;
  color: var(--stf-text);
}
.stf-page-btn.is-active { background: var(--stf-teal); color: #fff; border-color: var(--stf-teal); }
.stf-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.stf-form-section {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--stf-border);
  padding: 20px;
  margin-bottom: 16px;
  max-width: 520px;
}
.stf-form-section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.stf-section-number {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--stf-teal);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stf-form-section-header h3 { font-size: 15px; font-weight: 700; margin: 0; }
.stf-form-section-body { display: flex; flex-direction: column; gap: 14px; }
.stf-field { display: flex; flex-direction: column; gap: 6px; font-size: 13px; }
.stf-field-label { font-weight: 600; color: var(--stf-text); }
.stf-required { color: var(--stf-rose); margin-left: 2px; }
.stf-field input, .stf-field select {
  border: 1px solid var(--stf-border);
  border-radius: 7px;
  padding: 9px 12px;
  font-size: 13px;
  font-family: inherit;
  color: var(--stf-text);
  background: #fff;
  width: 100%;
}
.stf-field input:focus, .stf-field select:focus {
  outline: 2px solid var(--stf-teal);
  outline-offset: 1px;
  border-color: var(--stf-teal);
}
.stf-field input:disabled { background: #f1f5f9; color: var(--stf-text-muted); }
.stf-field-error { font-size: 11px; color: var(--stf-rose); font-weight: 600; }
.stf-form-actions { display: flex; gap: 12px; max-width: 520px; }
.stf-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
.stf-modal { background: #fff; border-radius: 16px; padding: 32px 28px; max-width: 360px; width: 100%; text-align: center; }
.stf-modal-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--stf-amber);
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.stf-modal-title { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
.stf-modal-text { font-size: 13px; color: var(--stf-text-muted); margin: 0 0 24px; }
.stf-modal-actions { display: flex; gap: 12px; }
.stf-modal-actions .stf-btn { flex: 1; justify-content: center; }
@media (max-width: 900px) {
  .stf-stats-row { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .stf-root { padding: 20px 16px 40px; }
  .stf-stats-row { grid-template-columns: 1fr 1fr; }
  .stf-form-actions { flex-direction: column-reverse; }
}
`;