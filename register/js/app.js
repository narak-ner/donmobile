// ===== ระบบบันทึกข้อมูลลูกค้า / ใบสมัครสินเชื่อ =====
// เก็บข้อมูลใน localStorage

const STORAGE_KEY = 'customer_applications';
const ADMIN_PASSWORD = '313326';
const EDIT_ACCESS_KEY = 'customer_app_edit_access';

// ใบอนุญาตแก้ไขแบบใช้ครั้งเดียว: หน้ารายการใส่รหัสผ่านแล้วส่งต่อให้หน้าแก้ไข
// เพื่อไม่ให้ต้องกรอกรหัสซ้ำสองรอบ
function grantEditAccess(appId) {
  sessionStorage.setItem(EDIT_ACCESS_KEY, appId);
}

function consumeEditAccess(appId) {
  const granted = sessionStorage.getItem(EDIT_ACCESS_KEY);
  sessionStorage.removeItem(EDIT_ACCESS_KEY);
  return granted === appId;
}

function loadApplications() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('ไม่สามารถโหลดข้อมูลได้', e);
    return [];
  }
}

function saveApplications(apps) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// แปลงข้อความลิงก์ให้เป็น <a> คลิกได้
function linkify(text) {
  if (!text) return '';
  const urlRegex = /(https?:\/\/[^\s<]+)/g;
  return escapeHtml(text).replace(urlRegex, (url) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer" class="social-link">${url}</a>`
  );
}

// ===== หน้าสรุป / สถิติ =====
function initDashboard() {
  const totalEl = document.getElementById('total-apps');
  const todayEl = document.getElementById('today-apps');
  if (!totalEl || !todayEl) return;

  const apps = loadApplications();
  totalEl.textContent = apps.length;

  const today = new Date().toLocaleDateString('th-TH');
  const todayCount = apps.filter(a => {
    const d = new Date(a.createdAt).toLocaleDateString('th-TH');
    return d === today;
  }).length;
  todayEl.textContent = todayCount;
}

// ===== หน้ากรอกฟอร์ม (index.html) =====
function initApplicationForm() {
  const form = document.getElementById('application-form');
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const editId = params.get('edit');

  // ค่าเริ่มต้น: ซ่อนส่วนข้อมูลเครื่องไว้ (เฉพาะแอดมินที่ปลดล็อกแล้วจึงเห็น)
  setDeviceSectionAdminMode(false);

  // ถ้ามี editId = แก้ไข ต้องผ่านรหัสผ่านก่อนเสมอ
  if (editId) {
    const apps = loadApplications();
    const app = apps.find(a => a.id === editId);

    if (!app) {
      showToast('ไม่พบใบสมัครที่ต้องการแก้ไข');
      return;
    }

    form.classList.add('form-locked');

    const openEditor = () => {
      form.classList.remove('form-locked');
      setDeviceSectionAdminMode(true);
      fillForm(app);
      document.querySelector('.page-title').textContent = 'แก้ไขข้อมูลลูกค้า';
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = '💾 บันทึกการแก้ไข';
      const cancelBtn = document.getElementById('cancel-edit');
      if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    };

    // ถ้ามาจากหน้ารายการที่เพิ่งใส่รหัสผ่านไปแล้ว ไม่ต้องถามซ้ำ
    if (consumeEditAccess(editId)) {
      openEditor();
    } else {
      showPasswordPrompt({
        title: 'แก้ไขข้อมูล',
        message: 'กรุณาใส่รหัสผ่านเพื่อแก้ไขใบสมัครนี้',
        onSuccess: openEditor,
        onCancel: () => {
          window.location.href = 'admin.html';
        }
      });
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const getVal = (id) => document.getElementById(id)?.value.trim() || '';

    const appData = {
      fullName: getVal('fullName'),
      nickname: getVal('nickname'),
      phone: getVal('phone'),
      lineId: getVal('lineId'),
      address: getVal('address'),
      companyName: getVal('companyName'),
      companyAddress: getVal('companyAddress'),
      companyPhone: getVal('companyPhone'),
      position: getVal('position'),
      salary: getVal('salary'),
      workExperience: getVal('workExperience'),
      ref1Name: getVal('ref1Name'),
      ref1Nickname: getVal('ref1Nickname'),
      ref1Phone: getVal('ref1Phone'),
      ref1Job: getVal('ref1Job'),
      ref1Relation: getVal('ref1Relation'),
      ref2Name: getVal('ref2Name'),
      ref2Nickname: getVal('ref2Nickname'),
      ref2Phone: getVal('ref2Phone'),
      ref2Job: getVal('ref2Job'),
      ref2Relation: getVal('ref2Relation'),
      guarantorName: getVal('guarantorName'),
      guarantorNickname: getVal('guarantorNickname'),
      guarantorPhone: getVal('guarantorPhone'),
      guarantorJob: getVal('guarantorJob'),
      guarantorIncome: getVal('guarantorIncome'),
      guarantorRelation: getVal('guarantorRelation'),
      socialLinks: getVal('socialLinks'),
      deviceModel: getVal('deviceModel'),
      deviceColor: getVal('deviceColor'),
      deviceCondition: getVal('deviceCondition'),
      devicePrice: getVal('devicePrice'),
      downPayment: getVal('downPayment'),
      installmentRate: getVal('installmentRate'),
      installmentMonths: getVal('installmentMonths'),
      shopAmount: getVal('shopAmount'),
      simProvider: getVal('simProvider')
    };

    if (!validateApplicationForm()) return;

    const apps = loadApplications();

    if (editId) {
      const idx = apps.findIndex(a => a.id === editId);
      if (idx >= 0) {
        apps[idx] = { ...apps[idx], ...appData };
        saveApplications(apps);
        showToast('แก้ไขข้อมูลเรียบร้อยแล้ว');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 800);
        return;
      }
    }

    const newApp = {
      id: generateId(),
      ...appData,
      createdAt: new Date().toISOString()
    };
    apps.unshift(newApp);
    saveApplications(apps);

    form.reset();
    showToast('บันทึกใบสมัครเรียบร้อยแล้ว');
  });
}

// ช่องที่ต้องกรอกให้ครบ (ข้อมูลส่วนตัวของลูกค้า)
const REQUIRED_FIELDS = [
  ['fullName', 'ชื่อ-สกุลลูกค้า'],
  ['phone', 'เบอร์โทรลูกค้า'],
  ['address', 'ที่อยู่ปัจจุบันของลูกค้า'],
  ['companyName', 'ชื่อบริษัท/ร้าน'],
  ['position', 'ตำแหน่ง / หน้าที่'],
  ['salary', 'เงินเดือน'],
  ['ref1Name', 'ชื่อ-สกุล บุคคลอ้างอิง 1'],
  ['ref1Phone', 'เบอร์โทร บุคคลอ้างอิง 1'],
  ['ref1Relation', 'ความสัมพันธ์ บุคคลอ้างอิง 1'],
  ['ref2Name', 'ชื่อ-สกุล บุคคลอ้างอิง 2'],
  ['ref2Phone', 'เบอร์โทร บุคคลอ้างอิง 2'],
  ['ref2Relation', 'ความสัมพันธ์ บุคคลอ้างอิง 2'],
  ['guarantorName', 'ชื่อ-สกุล คนค้ำ'],
  ['guarantorPhone', 'เบอร์โทร คนค้ำ'],
  ['guarantorIncome', 'รายได้ คนค้ำ'],
  ['guarantorRelation', 'ความสัมพันธ์ คนค้ำ']
];

function markInvalid(el) {
  if (!el) return;
  el.classList.add('field-invalid');
  const clear = () => {
    el.classList.remove('field-invalid');
    el.removeEventListener('input', clear);
    el.removeEventListener('change', clear);
  };
  el.addEventListener('input', clear);
  el.addEventListener('change', clear);
}

function validateApplicationForm() {
  const missing = [];
  let firstEl = null;

  REQUIRED_FIELDS.forEach(([id, label]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      missing.push(label);
      markInvalid(el);
      if (!firstEl) firstEl = el;
    }
  });

  if (missing.length === 0) return true;

  if (firstEl) {
    firstEl.focus();
    firstEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (missing.length <= 3) {
    showToast('กรุณากรอกให้ครบ: ' + missing.join(', '));
  } else {
    showToast('กรุณากรอกให้ครบทุกช่อง (ยังขาด ' + missing.length + ' ช่อง)');
  }
  return false;
}

function fillForm(app) {
  const fields = [
    'fullName', 'nickname', 'phone', 'lineId', 'address',
    'companyName', 'companyAddress', 'companyPhone', 'position', 'salary', 'workExperience',
    'ref1Name', 'ref1Nickname', 'ref1Phone', 'ref1Job', 'ref1Relation',
    'ref2Name', 'ref2Nickname', 'ref2Phone', 'ref2Job', 'ref2Relation',
    'guarantorName', 'guarantorNickname', 'guarantorPhone', 'guarantorJob',
    'guarantorIncome', 'guarantorRelation',
    'socialLinks', 'deviceModel', 'deviceColor', 'deviceCondition',
    'devicePrice', 'downPayment', 'installmentRate', 'installmentMonths',
    'shopAmount', 'simProvider'
  ];
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = app[id] || '';
  });
}

// ===== หน้าแอดมิน (admin.html) =====
function initAdminPage() {
  const shell = document.getElementById('admin-shell');
  const lock = document.getElementById('admin-lock');
  if (!shell || !lock) return;

  const input = document.getElementById('admin-password');
  const errorEl = document.getElementById('admin-password-error');
  const unlockBtn = document.getElementById('admin-unlock');

  function unlock() {
    if (input.value === ADMIN_PASSWORD) {
      lock.remove();
      shell.classList.remove('locked');
      initDashboard();
      initApplicationsList();
    } else {
      errorEl.textContent = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่';
      input.value = '';
      input.focus();
    }
  }

  input.focus();
  unlockBtn.addEventListener('click', unlock);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') unlock();
  });
}

function initApplicationsList() {
  const container = document.getElementById('apps-container');
  const searchInput = document.getElementById('search');
  if (!container) return;

  function renderApps(keyword = '') {
    let apps = loadApplications();
    const lower = keyword.toLowerCase();

    if (keyword) {
      apps = apps.filter(a =>
        (a.fullName && a.fullName.toLowerCase().includes(lower)) ||
        (a.nickname && a.nickname.toLowerCase().includes(lower)) ||
        (a.phone && a.phone.includes(keyword)) ||
        (a.companyName && a.companyName.toLowerCase().includes(lower)) ||
        (a.deviceModel && a.deviceModel.toLowerCase().includes(lower))
      );
    }

    container.innerHTML = '';

    if (apps.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <h3>ยังไม่มีใบสมัคร</h3>
          <p>${keyword ? 'ไม่พบข้อมูลที่ค้นหา ลองคำค้นอื่นดูนะ' : 'เริ่มกรอกใบสมัครแรกได้จากเมนู "กรอกใบสมัคร"'}</p>
        </div>
      `;
      return;
    }

    apps.forEach(app => {
      const date = new Date(app.createdAt).toLocaleString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      const card = document.createElement('div');
      card.className = 'app-card';
      card.innerHTML = `
        <div class="app-name">${escapeHtml(app.fullName || 'ไม่ระบุชื่อ')}</div>
        <div class="app-nickname">${escapeHtml(app.nickname ? 'ชื่อเล่น: ' + app.nickname : '')}</div>
        <div class="app-detail">📞 ${escapeHtml(app.phone || 'ไม่ระบุเบอร์')}</div>
        <div class="app-detail">🏢 ${escapeHtml(app.companyName || 'ไม่ระบุบริษัท')}</div>
        <div class="app-detail">📱 ${escapeHtml(app.deviceModel || 'ไม่ระบุรุ่น')} ${escapeHtml(app.deviceColor ? '(' + app.deviceColor + ')' : '')}</div>
        <div class="app-detail">💰 ${escapeHtml(app.devicePrice || 'ไม่ระบุราคา')}</div>
        <div class="app-detail">📅 ดาวน์ ${escapeHtml(app.downPayment || '-')} • ผ่อน ${escapeHtml(app.installmentRate || '-')} × ${escapeHtml(app.installmentMonths || '-')}</div>
        ${app.socialLinks ? `<div class="app-detail social-detail">🌐 ${linkify(app.socialLinks)}</div>` : ''}
        <div class="app-meta">
          <span>🕒 ${date}</span>
          <div class="app-actions">
            <button class="btn btn-sm btn-secondary" data-view="${app.id}">ดู</button>
            <button class="btn btn-sm btn-copy" data-copy="${app.id}">คัดลอก</button>
            <button class="btn btn-sm btn-success" data-edit="${app.id}">แก้ไข</button>
            <button class="btn btn-sm btn-danger" data-id="${app.id}">ลบ</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    container.querySelectorAll('button[data-id]').forEach(btn => {
      btn.addEventListener('click', function () {
        const appId = this.dataset.id;
        showPasswordPrompt({
          title: 'ยืนยันการลบ',
          message: 'กรุณาใส่รหัสผ่านเพื่อยืนยันการลบใบสมัครนี้',
          onSuccess: () => {
            deleteApplication(appId);
            renderApps(searchInput ? searchInput.value.trim() : '');
            initDashboard();
            showToast('ลบใบสมัครเรียบร้อยแล้ว');
          }
        });
      });
    });

    container.querySelectorAll('button[data-copy]').forEach(btn => {
      btn.addEventListener('click', function () {
        copyApplication(this.dataset.copy, this);
      });
    });

    container.querySelectorAll('button[data-edit]').forEach(btn => {
      btn.addEventListener('click', function () {
        const appId = this.dataset.edit;
        showPasswordPrompt({
          title: 'แก้ไขข้อมูล',
          message: 'กรุณาใส่รหัสผ่านเพื่อแก้ไขใบสมัครนี้',
          onSuccess: () => {
            grantEditAccess(appId);
            window.location.href = 'index.html?edit=' + encodeURIComponent(appId);
          }
        });
      });
    });

    container.querySelectorAll('button[data-view]').forEach(btn => {
      btn.addEventListener('click', function () {
        showApplicationDetail(this.dataset.view);
      });
    });
  }

  renderApps();

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      renderApps(this.value.trim());
    });
  }
}

function deleteApplication(id) {
  const apps = loadApplications().filter(a => a.id !== id);
  saveApplications(apps);
}

function showApplicationDetail(id) {
  const app = loadApplications().find(a => a.id === id);
  if (!app) return;

  const modal = document.createElement('div');
  modal.id = 'detail-modal';
  modal.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 300; padding: 20px;
  `;

  const fields = [
    ['ชื่อ-สกุล', app.fullName],
    ['ชื่อเล่น', app.nickname],
    ['เบอร์โทรลูกค้า', app.phone],
    ['ไอดีไลน์', app.lineId],
    ['ที่อยู่ปัจจุบัน', app.address],
    ['ชื่อบริษัท/ร้าน', app.companyName],
    ['ที่อยู่บริษัท', app.companyAddress],
    ['เบอร์โทรที่ทำงาน', app.companyPhone],
    ['ตำแหน่ง/หน้าที่', app.position],
    ['เงินเดือน', app.salary],
    ['อายุการทำงาน', app.workExperience],
    ['อ้างอิง 1', `${app.ref1Name || '-'} (${app.ref1Relation || '-'}) เบอร์ ${app.ref1Phone || '-'}`],
    ['อ้างอิง 2', `${app.ref2Name || '-'} (${app.ref2Relation || '-'}) เบอร์ ${app.ref2Phone || '-'}`],
    ['คนค้ำ', `${app.guarantorName || '-'} (${app.guarantorRelation || '-'}) รายได้ ${app.guarantorIncome || '-'}`],
    ['โซเชียลมีเดีย', app.socialLinks, true],
    ['รุ่น & ความจุ', app.deviceModel],
    ['สีเครื่อง', app.deviceColor],
    ['มือ 1/2', app.deviceCondition],
    ['ราคาเครื่อง', app.devicePrice],
    ['เงินดาวน์', app.downPayment],
    ['เรทผ่อน/เดือน', app.installmentRate],
    ['จำนวนงวด', app.installmentMonths],
    ['ยอดที่ร้านจัด & เรท %', app.shopAmount],
    ['ซิมที่ใช้', app.simProvider]
  ];

  modal.innerHTML = `
    <div class="detail-box">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h2 style="margin:0;color:var(--primary);">รายละเอียดใบสมัคร</h2>
        <button id="close-modal" style="background:none;border:none;font-size:1.5rem;cursor:pointer;">×</button>
      </div>
      <div style="display:grid;gap:10px;">
        ${fields.map(([k, v, isLink]) => `
          <div style="border-bottom:1px solid #e2e8f0;padding-bottom:8px;">
            <div style="font-size:0.8rem;color:var(--muted);">${k}</div>
            <div style="font-weight:600;">${isLink ? linkify(v) : (escapeHtml(v) || '-')}</div>
          </div>
        `).join('')}
      </div>
      <div class="detail-actions">
        <button id="modal-copy" class="btn btn-copy btn-sm">📋 คัดลอกข้อมูลฟอร์มนี้</button>
        <button id="modal-edit" class="btn btn-success btn-sm" data-edit="${app.id}">แก้ไข</button>
        <button id="modal-delete" class="btn btn-danger btn-sm">ลบ</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.getElementById('close-modal').addEventListener('click', () => modal.remove());

  document.getElementById('modal-copy').addEventListener('click', function () {
    copyApplication(app.id, this);
  });

  document.getElementById('modal-edit').addEventListener('click', function () {
    const appId = this.dataset.edit;
    showPasswordPrompt({
      title: 'แก้ไขข้อมูล',
      message: 'กรุณาใส่รหัสผ่านเพื่อแก้ไขใบสมัครนี้',
      onSuccess: () => {
        grantEditAccess(appId);
        modal.remove();
        window.location.href = 'index.html?edit=' + encodeURIComponent(appId);
      }
    });
  });

  document.getElementById('modal-delete').addEventListener('click', () => {
    showPasswordPrompt({
      title: 'ยืนยันการลบ',
      message: 'กรุณาใส่รหัสผ่านเพื่อยืนยันการลบใบสมัครนี้',
      onSuccess: () => {
        deleteApplication(app.id);
        modal.remove();
        initDashboard();
        initApplicationsList();
        showToast('ลบใบสมัครเรียบร้อยแล้ว');
      }
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

// ===== กล่องใส่รหัสผ่าน =====
function showPasswordPrompt(options) {
  const opts = typeof options === 'function'
    ? { onSuccess: options }
    : (options || {});

  const title = opts.title || 'ใส่รหัสผ่าน';
  const message = opts.message || 'กรุณาใส่รหัสผ่านเพื่อดำเนินการต่อ';

  const overlay = document.createElement('div');
  overlay.className = 'password-overlay';
  overlay.innerHTML = `
    <div class="password-box">
      <div style="font-size:2.5rem;margin-bottom:10px;">🔒</div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(message)}</p>
      <input type="password" id="edit-password" class="form-control" placeholder="••••••" maxlength="20" autocomplete="off">
      <div class="error" id="password-error"></div>
      <div class="password-actions">
        <button id="cancel-password" class="btn btn-secondary">ยกเลิก</button>
        <button id="confirm-password" class="btn btn-primary">ยืนยัน</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  const input = document.getElementById('edit-password');
  const errorEl = document.getElementById('password-error');

  input.focus();

  function check() {
    if (input.value === ADMIN_PASSWORD) {
      overlay.remove();
      if (typeof opts.onSuccess === 'function') opts.onSuccess();
    } else {
      errorEl.textContent = 'รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่';
      input.value = '';
      input.focus();
    }
  }

  function cancel() {
    overlay.remove();
    if (typeof opts.onCancel === 'function') opts.onCancel();
  }

  document.getElementById('confirm-password').addEventListener('click', check);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') check();
  });
  document.getElementById('cancel-password').addEventListener('click', cancel);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) cancel();
  });
}

// ===== คัดลอกข้อมูลใบสมัคร (ทีละฟอร์ม) =====
// ลำดับฟิลด์และชื่อที่ใช้ตอนคัดลอก (เรียงตามหัวข้อในฟอร์ม)
const COPY_SECTIONS = [
  {
    title: 'ข้อมูลลูกค้า',
    fields: [
      ['fullName', 'ชื่อ-สกุล'],
      ['nickname', 'ชื่อเล่น'],
      ['phone', 'เบอร์โทรลูกค้า'],
      ['lineId', 'ไอดีไลน์'],
      ['address', 'ที่อยู่ปัจจุบัน']
    ]
  },
  {
    title: 'ข้อมูลที่ทำงาน',
    fields: [
      ['companyName', 'ชื่อบริษัท/ร้าน'],
      ['companyPhone', 'เบอร์โทรที่ทำงาน'],
      ['companyAddress', 'ที่อยู่บริษัท'],
      ['position', 'ตำแหน่ง/หน้าที่'],
      ['salary', 'เงินเดือน'],
      ['workExperience', 'อายุการทำงาน']
    ]
  },
  {
    title: 'บุคคลอ้างอิง 1',
    fields: [
      ['ref1Name', 'ชื่อ-สกุล'],
      ['ref1Nickname', 'ชื่อเล่น'],
      ['ref1Phone', 'เบอร์โทร'],
      ['ref1Job', 'อาชีพ'],
      ['ref1Relation', 'ความสัมพันธ์']
    ]
  },
  {
    title: 'บุคคลอ้างอิง 2',
    fields: [
      ['ref2Name', 'ชื่อ-สกุล'],
      ['ref2Nickname', 'ชื่อเล่น'],
      ['ref2Phone', 'เบอร์โทร'],
      ['ref2Job', 'อาชีพ'],
      ['ref2Relation', 'ความสัมพันธ์']
    ]
  },
  {
    title: 'คนค้ำ',
    fields: [
      ['guarantorName', 'ชื่อ-สกุล'],
      ['guarantorNickname', 'ชื่อเล่น'],
      ['guarantorPhone', 'เบอร์โทร'],
      ['guarantorJob', 'อาชีพ'],
      ['guarantorIncome', 'รายได้'],
      ['guarantorRelation', 'ความสัมพันธ์']
    ]
  },
  {
    title: 'โซเชียลมีเดีย',
    fields: [
      ['socialLinks', 'ลิงก์ Facebook / TikTok / IG']
    ]
  },
  {
    title: 'ข้อมูลเครื่อง & การผ่อน',
    fields: [
      ['deviceModel', 'รุ่น & ความจุ'],
      ['deviceColor', 'สีเครื่อง'],
      ['deviceCondition', 'มือ 1/2'],
      ['devicePrice', 'ราคาเครื่อง'],
      ['downPayment', 'เงินดาวน์'],
      ['installmentRate', 'เรทผ่อน/เดือน'],
      ['installmentMonths', 'จำนวนงวด'],
      ['shopAmount', 'ยอดที่ร้านจัด & เรท %'],
      ['simProvider', 'ซิมที่ใช้']
    ]
  }
];

// สร้างข้อความของใบสมัคร 1 ใบ ตามโครงเดียวกับฟอร์ม
function buildApplicationText(app) {
  const lines = [];
  lines.push('ใบสมัคร: ' + (app.fullName || 'ไม่ระบุชื่อ'));
  if (app.createdAt) {
    lines.push('วันที่บันทึก: ' + new Date(app.createdAt).toLocaleString('th-TH', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }));
  }
  lines.push('');

  COPY_SECTIONS.forEach(section => {
    const rows = section.fields
      .map(([key, label]) => {
        const value = app[key] ? String(app[key]).trim() : '';
        return value ? label + ': ' + value : null;
      })
      .filter(Boolean);

    if (rows.length === 0) return;

    lines.push('【' + section.title + '】');
    rows.forEach(r => lines.push(r));
    lines.push('');
  });

  return lines.join('\n').trim();
}

// คัดลอกลงคลิปบอร์ด (มี fallback สำหรับเบราว์เซอร์ที่บล็อก clipboard API)
async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    // ตกไปใช้วิธีสำรองด้านล่าง
  }

  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

// คัดลอกใบสมัคร 1 ใบ พร้อมแสดงสถานะบนปุ่มที่กด
async function copyApplication(appId, btn) {
  const app = loadApplications().find(a => a.id === appId);
  if (!app) {
    showToast('ไม่พบข้อมูลใบสมัครนี้');
    return;
  }

  const text = buildApplicationText(app);
  const original = btn ? btn.textContent : '';

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ กำลังคัดลอก...';
  }

  const ok = await copyTextToClipboard(text);

  if (btn) {
    btn.disabled = false;
    btn.textContent = ok ? '✅ คัดลอกแล้ว' : original;
    if (ok) setTimeout(() => { btn.textContent = original; }, 2000);
  }

  showToast(ok
    ? 'คัดลอกข้อมูล ' + (app.fullName || 'ใบสมัครนี้') + ' แล้ว'
    : 'คัดลอกไม่สำเร็จ กรุณาลองใหม่');
}

// ===== ส่วนข้อมูลเครื่อง: แสดงเฉพาะแอดมิน =====
function setDeviceSectionAdminMode(isAdmin) {
  const section = document.getElementById('admin-device-section');
  const note = document.getElementById('device-pending-note');
  if (!section) return;

  if (isAdmin) {
    section.style.display = '';
    if (note) note.style.display = 'none';
  } else {
    section.style.display = 'none';
    if (note) note.style.display = '';
  }
}

// ===== เริ่มต้น =====
document.addEventListener('DOMContentLoaded', function () {
  initApplicationForm();
  initAdminPage();
});
