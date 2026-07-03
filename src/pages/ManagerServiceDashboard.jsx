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

  if (!res.ok) {
    let errorMessage = data?.message || `Request failed (${data.status})`;

    if (data?.errors?.properties) {
      errorMessage = Object.values(data.errors.properties)
        .flatMap((field) => field.errors)
        .join(", ");
    }

    throw new Error(errorMessage);
  }
  return data;
};

const MOCK_SERVICES = [
  { id: "PASSPORT001", name: "Passport Renewal", department: "Immigration", location: "Lagos Office", status: "Active", queueEnabled: true, queuePrefix: "A", dailyCapacity: 100, avgServiceMins: 15, maxQueueSize: 200, openingTime: "08:00", closingTime: "16:00", operatingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], todaysQueue: 75, completedToday: 65, avgWaitMins: 18, utilization: 85 },
  { id: "PASSPORT002", name: "Driving License", department: "Transport", location: "Abuja Office", status: "Active", queueEnabled: true, queuePrefix: "B", dailyCapacity: 80, avgServiceMins: 12, maxQueueSize: 150, openingTime: "08:00", closingTime: "16:00", operatingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], todaysQueue: 40, completedToday: 30, avgWaitMins: 12, utilization: 60 },
  { id: "PASSPORT003", name: "Tax Clearance", department: "Finance", location: "Port Harcourt", status: "Inactive", queueEnabled: false, queuePrefix: "C", dailyCapacity: 60, avgServiceMins: 20, maxQueueSize: 100, openingTime: "09:00", closingTime: "17:00", operatingDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], todaysQueue: 0, completedToday: 0, avgWaitMins: 0, utilization: 0 },
];

const DEPARTMENTS = ["Immigration", "Finance", "Health", "Transport", "Civil Registry"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const PAGE_SIZE = 7;

const serviceApi = {
  async list() {
    return authFetch("/api/service");
  },
  async create(payload) {
    return authFetch("/api/service", {
      method: "POST",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description || "",
        code: payload.serviceCode,
      }),
    });
  },
  async update(id, payload) {
    return authFetch(`/api/service/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: payload.name,
        description: payload.description || "",
        code: payload.serviceCode,
      }),
    });
  },
  async deactivate(id) {
    return authFetch(`/api/service/${id}`, { method: "DELETE" });
  },
};

function emptyForm() {
  return {
    name: "",
    serviceCode: "",
    description: "",
    department: DEPARTMENTS[0],
    location: "",
    queuePrefix: "",
    dailyCapacity: "",
    avgServiceMins: "",
    maxQueueSize: "",
    openingTime: "",
    closingTime: "",
    operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  };
}

function formFromService(svc) {
  return {
    name: svc.name,
    serviceCode: svc.id,
    description: svc.description || "",
    department: svc.department,
    location: svc.location,
    queuePrefix: svc.queuePrefix || "",
    dailyCapacity: svc.dailyCapacity,
    avgServiceMins: svc.avgServiceMins,
    maxQueueSize: svc.maxQueueSize,
    openingTime: svc.openingTime,
    closingTime: svc.closingTime,
    operatingDays: svc.operatingDays.map((d) =>
      ({ Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }[d] || d)
    ),
  };
}

export default function ManagerServiceDashboard() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("list");
  const [activeServiceId, setActiveServiceId] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Service");
  const [page, setPage] = useState(1);

  const [form, setForm] = useState(emptyForm());
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    serviceApi.list()
      .then(data => {
        const list = Array.isArray(data) ? data : data?.services || data?.data || [];
        if (list.length > 0) setServices(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeService = useMemo(
    () => services.find((s) => s.id === activeServiceId) || null,
    [services, activeServiceId]
  );

  const stats = useMemo(() => {
    const total = services.length;
    const active = services.filter((s) => s.status === "Active").length;
    const inactive = services.filter((s) => s.status === "Inactive").length;
    const paused = services.filter((s) => s.status === "Paused").length;
    return { total, active, inactive, paused };
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All Service" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [services, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredServices.length / PAGE_SIZE));
  const pagedServices = filteredServices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openCreate() {
    setForm(emptyForm());
    setFormErrors({});
    setMode("create");
  }

  function openDetail(id) {
    setActiveServiceId(id);
    setMode("detail");
  }

  function openEdit(id) {
    const svc = services.find((s) => s.id === id);
    if (!svc) return;
    setForm(formFromService(svc));
    setFormErrors({});
    setActiveServiceId(id);
    setMode("edit");
  }

  function backToList() {
    setMode("list");
    setActiveServiceId(null);
    setFormErrors({});
  }

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleDay(day) {
    setForm((prev) => ({
      ...prev,
      operatingDays: prev.operatingDays.includes(day)
        ? prev.operatingDays.filter((d) => d !== day)
        : [...prev.operatingDays, day],
    }));
  }

  function validateForm() {
    const errors = {};
    if (!form.name.trim()) errors.name = "Service name is required";
    if (!form.serviceCode.trim()) errors.serviceCode = "Service code is required";
    if (!form.department) errors.department = "Department is required";
    if (!form.location.trim()) errors.location = "Location is required";
    if (!form.queuePrefix.trim()) errors.queuePrefix = "Queue prefix is required";
    if (!form.dailyCapacity || Number(form.dailyCapacity) <= 0)
      errors.dailyCapacity = "Enter a valid daily capacity";
    if (!form.avgServiceMins || Number(form.avgServiceMins) <= 0)
      errors.avgServiceMins = "Enter a valid average service time";
    if (!form.maxQueueSize || Number(form.maxQueueSize) <= 0)
      errors.maxQueueSize = "Enter a valid maximum queue size";
    if (!form.openingTime) errors.openingTime = "Opening time is required";
    if (!form.closingTime) errors.closingTime = "Closing time is required";
    if (form.operatingDays.length === 0) errors.operatingDays = "Select at least one operating day";
    return errors;
    
  }

  async function handleCreateSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    try {
      const created = await serviceApi.create(form);
     
      setServices((prev) => [{
        ...form,
        ...created,
        id: created.id || created._id || form.serviceCode,
        status: "Active",
        todaysQueue: 0,
        completedToday: 0,
        avgWaitMins: 0,
        utilization: 0,
      }, ...prev]);
      backToList();
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSubmitting(true);
    try {
      await serviceApi.update(activeServiceId, form);
      setServices((prev) =>
        prev.map((s) => (s.id === activeServiceId ? { ...s, ...form, id: s.id } : s))
      );
      setMode("detail");
    } catch (err) {
      setFormErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmDeactivate() {
    setSubmitting(true);
    try {
      await serviceApi.deactivate(activeServiceId);
      setServices((prev) =>
        prev.map((s) => (s.id === activeServiceId ? { ...s, status: "Inactive" } : s))
      );
      setShowDeactivateModal(false);
      setMode("list");
      setActiveServiceId(null);
    } catch (err) {
      setShowDeactivateModal(false);
      console.error("Failed to deactivate service:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (mode === "list" && services.length === 0 && !loading) {
    return (
      <div className="svc-root">
        <ServiceHeader
          title="Service Management"
          subtitle="Manage all available service across the platform"
          showDate
        />
        <div className="svc-empty">
          <div className="svc-empty-illustration" aria-hidden="true">
            <FolderIllustration />
          </div>
          <h2 className="svc-empty-title">No Service Created</h2>
          <p className="svc-empty-text">
            You have not created any service yet.<br />
            Create your first service to begin queue management
          </p>
          <button type="button" className="svc-btn svc-btn-primary" onClick={openCreate}>
            Create Service
          </button>
        </div>
        <style>{STYLES}</style>
      </div>
    );
  }

  if (mode === "list") {
    return (
      <div className="svc-root">
        <ServiceHeader
          title="Service Management"
          subtitle="Manage all available service across the platform"
          showDate
          action={
            <button type="button" className="svc-btn svc-btn-primary" onClick={openCreate}>
              Create Service
            </button>
          }
        />

        <div className="svc-stats-row">
          <StatCard value={stats.total} label="Total Service" tone="neutral" />
          <StatCard value={stats.active} label="Active Services" tone="teal" />
          <StatCard value={stats.inactive} label="Inactive Services" tone="rose" />
          <StatCard value={stats.paused} label="Paused Queue" tone="amber" />
        </div>

        <div className="svc-toolbar">
          <div className="svc-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search service"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            />
          </div>
          <select
            className="svc-select"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option>All Service</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Paused</option>
          </select>
          <button type="button" className="svc-btn svc-btn-outline svc-filter-btn">
            <FilterIcon />
            Filter
          </button>
        </div>

        <div className="svc-table-wrap">
          <table className="svc-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Department</th>
                <th>Location</th>
                <th>Status</th>
                <th>Queue</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pagedServices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="svc-table-empty">No services match your search.</td>
                </tr>
              ) : (
                pagedServices.map((svc) => (
                  <tr key={svc.id}>
                    <td className="svc-table-name">{svc.name}</td>
                    <td>{svc.department || "—"}</td>
                    <td>{svc.location || "—"}</td>
                    <td><StatusBadge status={svc.status} /></td>
                    <td>
                      <span className={`svc-queue-pill ${svc.queueEnabled ? "is-enabled" : "is-disabled"}`}>
                        {svc.queueEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="svc-link-btn" onClick={() => openDetail(svc.id)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="svc-pagination">
          <span>
            Showing {filteredServices.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to{" "}
            {Math.min(page * PAGE_SIZE, filteredServices.length)} of {filteredServices.length} service
          </span>
          <div className="svc-pagination-controls">
            <button type="button" className="svc-page-btn" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} type="button" className={`svc-page-btn ${p === page ? "is-active" : ""}`} onClick={() => setPage(p)}>
                {p}
              </button>
            ))}
            <button type="button" className="svc-page-btn" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              &rsaquo;
            </button>
          </div>
        </div>

        <style>{STYLES}</style>
      </div>
    );
  }

  if (mode === "create" || mode === "edit") {
    const isEdit = mode === "edit";
    return (
      <div className="svc-root">
        <ServiceHeader
          title={isEdit ? "Edit Service" : "Create New Service"}
          subtitle={isEdit ? "Update the service information" : "Add a new service that customers can join"}
        />

        <form className="svc-form" onSubmit={isEdit ? handleEditSubmit : handleCreateSubmit} noValidate>
          <div className="svc-form-grid">
            <FormSection number={1} title="Basic Information">
              <Field label="Service Name" error={formErrors.name} required>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Passport Renewal"
                />
              </Field>
              <Field label="Service Code" error={formErrors.serviceCode} required>
                <input
                  type="text"
                  value={form.serviceCode}
                  onChange={(e) => updateField("serviceCode", e.target.value)}
                  placeholder="001"
                  disabled={isEdit}
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Renew expired passport"
                  rows={3}
                />
              </Field>
            </FormSection>

            <FormSection number={2} title="Location and Department">
              <Field label="Department" error={formErrors.department} required>
                <select value={form.department} onChange={(e) => updateField("department", e.target.value)}>
                  {DEPARTMENTS.map((d) => (<option key={d} value={d}>{d}</option>))}
                </select>
              </Field>
              <Field label="Location" error={formErrors.location} required>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                  placeholder="Lagos Office"
                />
              </Field>
            </FormSection>

            <FormSection number={3} title="Queue Configuration">
              <Field label="Queue Prefix" error={formErrors.queuePrefix} required>
                <input
                  type="text"
                  value={form.queuePrefix}
                  onChange={(e) => updateField("queuePrefix", e.target.value)}
                  placeholder="A"
                  maxLength={3}
                />
                <span className="svc-field-hint">Prefix for queue number</span>
              </Field>
              <Field label="Daily Capacity" error={formErrors.dailyCapacity} required>
                <input
                  type="number"
                  min="1"
                  value={form.dailyCapacity}
                  onChange={(e) => updateField("dailyCapacity", e.target.value)}
                  placeholder="100"
                />
                <span className="svc-field-hint">Maximum customers per day</span>
              </Field>
              <Field label="Average Service Time (mins)" error={formErrors.avgServiceMins} required>
                <input
                  type="number"
                  min="1"
                  value={form.avgServiceMins}
                  onChange={(e) => updateField("avgServiceMins", e.target.value)}
                  placeholder="15"
                />
              </Field>
              <Field label="Maximum Queue Size" error={formErrors.maxQueueSize} required>
                <input
                  type="number"
                  min="1"
                  value={form.maxQueueSize}
                  onChange={(e) => updateField("maxQueueSize", e.target.value)}
                  placeholder="200"
                />
                <span className="svc-field-hint">Maximum people allowed in queue</span>
              </Field>
            </FormSection>

            <FormSection number={4} title="Operation Hours">
              <Field label="Opening Time" error={formErrors.openingTime} required>
                <input type="time" value={form.openingTime} onChange={(e) => updateField("openingTime", e.target.value)} />
              </Field>
              <Field label="Closing Time" error={formErrors.closingTime} required>
                <input type="time" value={form.closingTime} onChange={(e) => updateField("closingTime", e.target.value)} />
              </Field>
              <Field label="Operating Days" error={formErrors.operatingDays} required>
                <div className="svc-days-grid">
                  {DAYS.map((day) => (
                    <label key={day} className="svc-day-checkbox">
                      <input
                        type="checkbox"
                        checked={form.operatingDays.includes(day)}
                        onChange={() => toggleDay(day)}
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </Field>
            </FormSection>
          </div>

          {formErrors.submit && (
            <div style={{ color: "#f43f5e", fontSize: 13, marginBottom: 12, marginTop: 8 }}>
              {formErrors.submit}
            </div>
          )}

          <div className="svc-form-actions">
            <button
              type="button"
              className="svc-btn svc-btn-outline"
              onClick={() => (isEdit ? setMode("detail") : backToList())}
              disabled={submitting}
            >
              Cancel
            </button>
            <button type="submit" className="svc-btn svc-btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>

        <style>{STYLES}</style>
      </div>
    );
  }

  if (mode === "detail" && activeService) {
    const svc = activeService;
    return (
      <div className="svc-root">
        <ServiceHeader
          title={svc.name}
          titleBadge={<StatusBadge status={svc.status} />}
          subtitle={svc.id}
          action={
            <div className="svc-detail-actions">
              <button type="button" className="svc-btn svc-btn-outline" onClick={() => openEdit(svc.id)}>
                Edit Service
              </button>
              <button
                type="button"
                className="svc-btn svc-btn-danger"
                onClick={() => setShowDeactivateModal(true)}
                disabled={svc.status === "Inactive"}
              >
                Deactivate
              </button>
            </div>
          }
        />
        <button type="button" className="svc-back-link" onClick={backToList}>
          Back to Service Management
        </button>

        <div className="svc-detail-grid">
          <div className="svc-info-card">
            <h3 className="svc-info-title">Service Information</h3>
            <dl className="svc-info-list">
              <InfoRow label="Service Name" value={svc.name} />
              <InfoRow label="Service Code" value={svc.id} />
              <InfoRow label="Description" value={svc.description || "—"} />
              <InfoRow label="Department" value={svc.department || "—"} />
              <InfoRow label="Location" value={svc.location || "—"} />
              <InfoRow label="Queue Prefix" value={svc.queuePrefix || "—"} />
              <InfoRow label="Daily Capacity" value={svc.dailyCapacity || "—"} />
              <InfoRow label="Average Service Time" value={svc.avgServiceMins ? `${svc.avgServiceMins} mins` : "—"} />
              <InfoRow label="Maximum Queue Size" value={svc.maxQueueSize || "—"} />
              <InfoRow
                label="Operating Hours"
                value={svc.openingTime && svc.closingTime ? `${formatTime(svc.openingTime)} - ${formatTime(svc.closingTime)}` : "—"}
              />
              <InfoRow label="Operating Days" value={svc.operatingDays?.join(", ") || "—"} />
            </dl>
            <button type="button" className="svc-btn svc-btn-primary svc-info-cta">
              View Live Queue
            </button>
          </div>

          <div className="svc-detail-side">
            <div className="svc-today-card">
              <h3 className="svc-info-title">Today's Statistics</h3>
              <div className="svc-today-grid">
                <MiniStat value={svc.todaysQueue || 0} label="Today's Queue" tone="neutral" />
                <MiniStat value={svc.completedToday || 0} label="Completed Today" tone="teal" />
                <MiniStat value={`${svc.avgWaitMins || 0} mins`} label="Average Wait Time" tone="amber" />
                <MiniStat value={`${svc.utilization || 0}%`} label="Utilization" tone="blue" />
              </div>
            </div>

            <div className="svc-summary-card">
              <h3 className="svc-info-title">Queue Summary (This Week)</h3>
              <WeekSparkline />
              <div className="svc-summary-legend">
                <span><i className="svc-legend-dot is-teal" /> Completed</span>
                <span><i className="svc-legend-dot is-blue" /> Joined</span>
              </div>
            </div>
          </div>
        </div>

        {showDeactivateModal && (
          <DeactivateModal
            onCancel={() => setShowDeactivateModal(false)}
            onConfirm={handleConfirmDeactivate}
            submitting={submitting}
          />
        )}

        <style>{STYLES}</style>
      </div>
    );
  }

  backToList();
  return null;
}

function ServiceHeader({ title, subtitle, titleBadge, showDate, action }) {
  const today = useMemo(
    () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    []
  );
  return (
    <div className="svc-page-header">
      <div>
        <h1 className="svc-page-title">
          {title}
          {titleBadge && <span className="svc-title-badge-wrap">{titleBadge}</span>}
        </h1>
        <p className="svc-page-subtitle">{subtitle}</p>
      </div>
      <div className="svc-header-right">
        {showDate && (
          <div className="svc-date-pill">
            <CalendarIcon />
            Today, {today}
          </div>
        )}
        {action}
      </div>
    </div>
  );
}

function StatCard({ value, label, tone }) {
  return (
    <div className={`svc-stat-card tone-${tone}`}>
      <div className="svc-stat-value">{value}</div>
      <div className="svc-stat-label">{label}</div>
    </div>
  );
}

function MiniStat({ value, label, tone }) {
  return (
    <div className={`svc-mini-stat tone-${tone}`}>
      <div className="svc-mini-stat-value">{value}</div>
      <div className="svc-mini-stat-label">{label}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const cls = status === "Active" ? "is-active" : status === "Inactive" ? "is-inactive" : "is-paused";
  return <span className={`svc-status-badge ${cls}`}>{status}</span>;
}

function InfoRow({ label, value }) {
  return (
    <div className="svc-info-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function FormSection({ number, title, children }) {
  return (
    <div className="svc-form-section">
      <div className="svc-form-section-header">
        <span className="svc-section-number">{number}</span>
        <h3>{title}</h3>
      </div>
      <div className="svc-form-section-body">{children}</div>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="svc-field">
      <span className="svc-field-label">
        {label}
        {required && <span className="svc-required">*</span>}
      </span>
      {children}
      {error && <span className="svc-field-error">{error}</span>}
    </label>
  );
}

function DeactivateModal({ onCancel, onConfirm, submitting }) {
  return (
    <div className="svc-modal-overlay" role="dialog" aria-modal="true">
      <div className="svc-modal">
        <div className="svc-modal-icon">!</div>
        <h3 className="svc-modal-title">Deactivate Service?</h3>
        <p className="svc-modal-text">Customers will no longer be able to join this queue</p>
        <div className="svc-modal-actions">
          <button type="button" className="svc-btn svc-btn-outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </button>
          <button type="button" className="svc-btn svc-btn-danger" onClick={onConfirm} disabled={submitting}>
            {submitting ? "Deactivating..." : "Deactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}

function WeekSparkline() {
  return (
    <svg viewBox="0 0 280 80" className="svc-sparkline" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="0,55 40,40 80,48 120,25 160,35 200,15 240,30 280,18" fill="none" stroke="var(--svc-blue)" strokeWidth="2" />
      <polyline points="0,65 40,60 80,62 120,45 160,50 200,38 240,42 280,33" fill="none" stroke="var(--svc-teal)" strokeWidth="2" />
    </svg>
  );
}

function formatTime(t) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function FolderIllustration() {
  return (
    <svg width="180" height="140" viewBox="0 0 180 140" fill="none">
      <ellipse cx="90" cy="120" rx="70" ry="8" fill="var(--svc-mint-shadow)" />
      <circle cx="125" cy="40" r="34" fill="var(--svc-teal-soft)" />
      <path d="M20 55 H80 L92 70 H160 A8 8 0 0 1 168 78 V112 A8 8 0 0 1 160 120 H20 A8 8 0 0 1 12 112 V63 A8 8 0 0 1 20 55 Z" fill="var(--svc-teal)" />
      <path d="M20 55 H80 L92 70 H160 A8 8 0 0 1 168 78 V82 H12 V63 A8 8 0 0 1 20 55 Z" fill="var(--svc-teal-dark)" />
      <circle cx="60" cy="40" r="14" fill="var(--svc-skin)" />
      <path d="M44 50 q16 -10 32 0 l-4 22 h-24 z" fill="var(--svc-navy)" />
    </svg>
  );
}

const STYLES = `
.svc-root {
  --svc-teal: #14b8a6;
  --svc-teal-dark: #0d9488;
  --svc-teal-soft: #99f6e4;
  --svc-mint: #f0fdfa;
  --svc-mint-shadow: rgba(20, 184, 166, 0.12);
  --svc-navy: #0f172a;
  --svc-rose: #f43f5e;
  --svc-rose-soft: #ffe4e6;
  --svc-amber: #f59e0b;
  --svc-amber-soft: #fef3c7;
  --svc-blue: #3b82f6;
  --svc-blue-soft: #dbeafe;
  --svc-skin: #fcd9b8;
  --svc-border: #e2e8f0;
  --svc-text: #0f172a;
  --svc-text-muted: #64748b;
  background: var(--svc-mint);
  min-height: 100%;
  padding: 28px 32px 48px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: var(--svc-text);
  box-sizing: border-box;
}
.svc-root * { box-sizing: border-box; }
.svc-page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
.svc-page-title { font-size: 26px; font-weight: 700; margin: 0 0 6px; display: flex; align-items: center; gap: 10px; }
.svc-title-badge-wrap { display: inline-flex; }
.svc-page-subtitle { margin: 0; color: var(--svc-text-muted); font-size: 14px; }
.svc-header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.svc-date-pill { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--svc-border); border-radius: 8px; padding: 8px 14px; font-size: 13px; color: var(--svc-text-muted); }
.svc-btn { border: none; border-radius: 8px; padding: 10px 18px; font-size: 14px; font-weight: 600; cursor: pointer; transition: opacity 0.15s ease, transform 0.05s ease; display: inline-flex; align-items: center; gap: 6px; }
.svc-btn:active { transform: translateY(1px); }
.svc-btn:disabled { opacity: 0.55; cursor: not-allowed; }
.svc-btn-primary { background: var(--svc-teal); color: #fff; }
.svc-btn-primary:hover:not(:disabled) { background: var(--svc-teal-dark); }
.svc-btn-outline { background: #fff; color: var(--svc-text); border: 1px solid var(--svc-border); }
.svc-btn-outline:hover:not(:disabled) { background: #f8fafc; }
.svc-btn-danger { background: var(--svc-rose); color: #fff; }
.svc-btn-danger:hover:not(:disabled) { background: #e11d48; }
.svc-link-btn { background: none; border: none; color: var(--svc-teal-dark); font-weight: 600; cursor: pointer; font-size: 13px; padding: 0; }
.svc-link-btn:hover { text-decoration: underline; }
.svc-empty { background: #fff; border-radius: 16px; padding: 64px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; }
.svc-empty-illustration { margin-bottom: 24px; }
.svc-empty-title { font-size: 20px; font-weight: 700; margin: 0 0 10px; }
.svc-empty-text { color: var(--svc-text-muted); font-size: 14px; line-height: 1.6; margin: 0 0 28px; }
.svc-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px; }
.svc-stat-card { background: #fff; border-radius: 12px; padding: 18px 20px; border: 1px solid var(--svc-border); }
.svc-stat-value { font-size: 26px; font-weight: 700; line-height: 1; }
.svc-stat-label { font-size: 13px; color: var(--svc-text-muted); margin-top: 6px; }
.svc-stat-card.tone-teal .svc-stat-value { color: var(--svc-teal-dark); }
.svc-stat-card.tone-rose .svc-stat-value { color: var(--svc-rose); }
.svc-stat-card.tone-amber .svc-stat-value { color: var(--svc-amber); }
.svc-stat-card.tone-neutral .svc-stat-value { color: var(--svc-text); }
.svc-toolbar { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
.svc-search { flex: 1; min-width: 220px; display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid var(--svc-border); border-radius: 8px; padding: 9px 14px; color: var(--svc-text-muted); }
.svc-search input { border: none; outline: none; flex: 1; font-size: 14px; background: transparent; color: var(--svc-text); }
.svc-select { border: 1px solid var(--svc-border); border-radius: 8px; padding: 9px 14px; font-size: 14px; background: #fff; color: var(--svc-text); min-width: 140px; }
.svc-filter-btn { background: #fff; }
.svc-table-wrap { background: #fff; border-radius: 12px; border: 1px solid var(--svc-border); overflow-x: auto; margin-bottom: 16px; }
.svc-table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 640px; }
.svc-table th { text-align: left; padding: 14px 18px; color: var(--svc-text-muted); font-weight: 600; border-bottom: 1px solid var(--svc-border); white-space: nowrap; }
.svc-table td { padding: 14px 18px; border-bottom: 1px solid var(--svc-border); white-space: nowrap; }
.svc-table tr:last-child td { border-bottom: none; }
.svc-table-name { font-weight: 600; }
.svc-table-empty { text-align: center; color: var(--svc-text-muted); padding: 32px 0; }
.svc-status-badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
.svc-status-badge.is-active { background: var(--svc-mint-shadow); color: var(--svc-teal-dark); }
.svc-status-badge.is-inactive { background: var(--svc-rose-soft); color: var(--svc-rose); }
.svc-status-badge.is-paused { background: var(--svc-amber-soft); color: var(--svc-amber); }
.svc-queue-pill { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
.svc-queue-pill.is-enabled { background: var(--svc-mint-shadow); color: var(--svc-teal-dark); }
.svc-queue-pill.is-disabled { background: #f1f5f9; color: var(--svc-text-muted); }
.svc-pagination { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--svc-text-muted); }
.svc-pagination-controls { display: flex; gap: 6px; }
.svc-page-btn { border: 1px solid var(--svc-border); background: #fff; border-radius: 6px; min-width: 30px; height: 30px; font-size: 13px; cursor: pointer; color: var(--svc-text); }
.svc-page-btn.is-active { background: var(--svc-teal); color: #fff; border-color: var(--svc-teal); }
.svc-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.svc-form { background: transparent; }
.svc-form-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: start; }
.svc-form-section { background: #fff; border-radius: 12px; border: 1px solid var(--svc-border); padding: 20px; }
.svc-form-section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
.svc-section-number { width: 22px; height: 22px; border-radius: 50%; background: var(--svc-teal); color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.svc-form-section-header h3 { font-size: 15px; font-weight: 700; margin: 0; }
.svc-form-section-body { display: flex; flex-direction: column; gap: 14px; }
.svc-field { display: flex; flex-direction: column; gap: 6px; font-size: 13px; }
.svc-field-label { font-weight: 600; color: var(--svc-text); }
.svc-required { color: var(--svc-rose); margin-left: 2px; }
.svc-field input, .svc-field select, .svc-field textarea { border: 1px solid var(--svc-border); border-radius: 7px; padding: 9px 12px; font-size: 13px; font-family: inherit; color: var(--svc-text); background: #fff; width: 100%; }
.svc-field input:focus, .svc-field select:focus, .svc-field textarea:focus { outline: 2px solid var(--svc-teal); outline-offset: 1px; border-color: var(--svc-teal); }
.svc-field input:disabled { background: #f1f5f9; color: var(--svc-text-muted); }
.svc-field-hint { font-size: 11px; color: var(--svc-text-muted); }
.svc-field-error { font-size: 11px; color: var(--svc-rose); font-weight: 600; }
.svc-days-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
.svc-day-checkbox { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; cursor: pointer; }
.svc-day-checkbox input { width: auto; accent-color: var(--svc-teal); }
.svc-form-actions { display: flex; justify-content: flex-end; gap: 12px; margin-top: 20px; }
.svc-back-link { background: none; border: none; color: var(--svc-text-muted); font-size: 13px; cursor: pointer; padding: 0; margin-bottom: 18px; display: inline-block; }
.svc-back-link:hover { color: var(--svc-text); }
.svc-detail-actions { display: flex; gap: 10px; }
.svc-detail-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 20px; align-items: start; }
.svc-info-card { background: #fff; border: 2px solid var(--svc-teal); border-radius: 14px; padding: 24px; }
.svc-info-title { font-size: 14px; font-weight: 700; margin: 0 0 16px; color: var(--svc-teal-dark); }
.svc-info-list { display: flex; flex-direction: column; gap: 12px; margin: 0 0 20px; }
.svc-info-row { display: flex; justify-content: space-between; gap: 12px; font-size: 13px; border-bottom: 1px solid var(--svc-border); padding-bottom: 10px; }
.svc-info-row dt { color: var(--svc-text-muted); }
.svc-info-row dd { margin: 0; font-weight: 600; text-align: right; }
.svc-info-cta { width: 100%; justify-content: center; }
.svc-detail-side { display: flex; flex-direction: column; gap: 20px; }
.svc-today-card, .svc-summary-card { background: #fff; border-radius: 14px; border: 1px solid var(--svc-border); padding: 22px; }
.svc-today-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.svc-mini-stat { border-radius: 10px; padding: 14px; }
.svc-mini-stat.tone-neutral { background: #f1f5f9; }
.svc-mini-stat.tone-teal { background: var(--svc-mint-shadow); }
.svc-mini-stat.tone-amber { background: var(--svc-amber-soft); }
.svc-mini-stat.tone-blue { background: var(--svc-blue-soft); }
.svc-mini-stat-value { font-size: 20px; font-weight: 700; }
.svc-mini-stat.tone-teal .svc-mini-stat-value { color: var(--svc-teal-dark); }
.svc-mini-stat.tone-amber .svc-mini-stat-value { color: var(--svc-amber); }
.svc-mini-stat.tone-blue .svc-mini-stat-value { color: var(--svc-blue); }
.svc-mini-stat-label { font-size: 11px; color: var(--svc-text-muted); margin-top: 4px; }
.svc-sparkline { width: 100%; height: 80px; }
.svc-summary-legend { display: flex; gap: 16px; margin-top: 10px; font-size: 12px; color: var(--svc-text-muted); }
.svc-summary-legend span { display: flex; align-items: center; gap: 6px; }
.svc-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.svc-legend-dot.is-teal { background: var(--svc-teal); }
.svc-legend-dot.is-blue { background: var(--svc-blue); }
.svc-modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.55); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 16px; }
.svc-modal { background: #fff; border-radius: 16px; padding: 32px 28px; max-width: 360px; width: 100%; text-align: center; }
.svc-modal-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--svc-amber); color: #fff; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.svc-modal-title { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
.svc-modal-text { font-size: 13px; color: var(--svc-text-muted); margin: 0 0 24px; }
.svc-modal-actions { display: flex; gap: 12px; }
.svc-modal-actions .svc-btn { flex: 1; justify-content: center; }
@media (max-width: 900px) {
  .svc-stats-row { grid-template-columns: repeat(2, 1fr); }
  .svc-form-grid { grid-template-columns: 1fr; }
  .svc-detail-grid { grid-template-columns: 1fr; }
  .svc-today-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 540px) {
  .svc-root { padding: 20px 16px 40px; }
  .svc-stats-row { grid-template-columns: 1fr 1fr; }
  .svc-days-grid { grid-template-columns: 1fr; }
}
`;