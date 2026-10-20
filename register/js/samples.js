// ===== ข้อมูลตัวอย่าง 5 รายการ =====
// ใส่ให้ครั้งเดียวตอนเปิดระบบครั้งแรก เพื่อให้เห็นหน้าตาข้อมูลจริง
// ถ้าผู้ใช้ลบตัวอย่างออกแล้ว จะไม่ถูกใส่กลับมาอีก
// ถ้ามีข้อมูลจริงอยู่แล้ว จะไม่ทับ

const SEED_KEY = 'customer_app_seeded_v2';

function buildSampleApplications() {
  const day = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() - offset);
    d.setHours(10 + offset, 30, 0, 0);
    return d.toISOString();
  };

  return [
    {
      id: 'sample-1',
      fullName: 'สมชาย ใจดี',
      nickname: 'ชาย',
      phone: '081-234-5678',
      lineId: 'somchai.j',
      address: '123/45 หมู่ 6 ต.บางรัก อ.เมือง จ.กรุงเทพฯ 10500',
      companyName: 'บริษัท เอบีซี เทรดดิ้ง จำกัด',
      companyAddress: '88/9 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110',
      companyPhone: '02-123-4567',
      position: 'พนักงานขาย',
      salary: '18,000 บาท',
      workExperience: '3 ปี',
      ref1Name: 'สมปอง ใจดี',
      ref1Nickname: 'ปอง',
      ref1Phone: '086-111-2222',
      ref1Job: 'ค้าขาย',
      ref1Relation: 'พี่ชาย',
      ref2Name: 'วิชัย มั่นคง',
      ref2Nickname: 'ชัย',
      ref2Phone: '087-333-4444',
      ref2Job: 'พนักงานบริษัท',
      ref2Relation: 'เพื่อน',
      guarantorName: 'สมหญิง ใจดี',
      guarantorNickname: 'หญิง',
      guarantorPhone: '089-555-6666',
      guarantorJob: 'ข้าราชการ',
      guarantorIncome: '25,000 บาท/เดือน',
      guarantorRelation: 'มารดา',
      socialLinks: 'https://www.facebook.com/somchai.jaidee',
      deviceModel: 'iPhone 15 Pro 256GB',
      deviceColor: 'Natural Titanium',
      deviceCondition: 'มือ 1',
      devicePrice: '25,000 บาท',
      downPayment: '5,000 บาท',
      installmentRate: '2,500 บาท',
      installmentMonths: '12 งวด',
      shopAmount: '25,000 บาท / 5%',
      simProvider: 'AIS',
      createdAt: day(0)
    },
    {
      id: 'sample-2',
      fullName: 'สมหญิง รักงาน',
      nickname: 'หญิง',
      phone: '089-999-1111',
      lineId: 'ying.rakngan',
      address: '56 หมู่ 3 ต.หนองปรือ อ.บางละมุง จ.ชลบุรี 20150',
      companyName: 'ร้านกาแฟ บ้านสวน',
      companyAddress: '99/1 ถ.เลียบชายหาด ต.หนองปรือ อ.บางละมุง ชลบุรี',
      companyPhone: '038-222-333',
      position: 'เจ้าของร้าน',
      salary: '22,000 บาท',
      workExperience: '5 ปี',
      ref1Name: 'ปรีชา รักงาน',
      ref1Nickname: 'ชา',
      ref1Phone: '081-777-8888',
      ref1Job: 'เกษตรกร',
      ref1Relation: 'บิดา',
      ref2Name: 'นภา สวยงาม',
      ref2Nickname: 'นภา',
      ref2Phone: '082-444-5555',
      ref2Job: 'พนักงานร้าน',
      ref2Relation: 'เพื่อนร่วมงาน',
      guarantorName: 'ปรีชา รักงาน',
      guarantorNickname: 'ชา',
      guarantorPhone: '081-777-8888',
      guarantorJob: 'เกษตรกร',
      guarantorIncome: '15,000 บาท/เดือน',
      guarantorRelation: 'บิดา',
      socialLinks: 'https://www.tiktok.com/@baansuan.cafe',
      deviceModel: 'Samsung Galaxy S24 Ultra 512GB',
      deviceColor: 'Titanium Black',
      deviceCondition: 'มือ 1',
      devicePrice: '26,000 บาท',
      downPayment: '8,000 บาท',
      installmentRate: '1,800 บาท',
      installmentMonths: '10 งวด',
      shopAmount: '18,000 บาท / 4%',
      simProvider: 'True',
      createdAt: day(0)
    },
    {
      id: 'sample-3',
      fullName: 'อนุชา พากเพียร',
      nickname: 'นุ',
      phone: '086-222-3344',
      lineId: 'anucha.p',
      address: '77/8 ต.ในเมือง อ.เมือง จ.ขอนแก่น 40000',
      companyName: 'หจก. พากเพียรก่อสร้าง',
      companyAddress: '12 ถ.มิตรภาพ ต.ในเมือง อ.เมือง ขอนแก่น 40000',
      companyPhone: '043-111-222',
      position: 'โฟร์แมน',
      salary: '20,000 บาท',
      workExperience: '4 ปี',
      ref1Name: 'บุญมี พากเพียร',
      ref1Nickname: 'มี',
      ref1Phone: '085-666-7777',
      ref1Job: 'รับจ้างทั่วไป',
      ref1Relation: 'ลุง',
      ref2Name: 'กิตติศักดิ์ ทองดี',
      ref2Nickname: 'กิต',
      ref2Phone: '084-888-9999',
      ref2Job: 'ช่างไฟฟ้า',
      ref2Relation: 'เพื่อน',
      guarantorName: 'บุญมี พากเพียร',
      guarantorNickname: 'มี',
      guarantorPhone: '085-666-7777',
      guarantorJob: 'รับจ้างทั่วไป',
      guarantorIncome: '18,000 บาท/เดือน',
      guarantorRelation: 'ลุง',
      socialLinks: 'https://www.facebook.com/anucha.p',
      deviceModel: 'OPPO Reno 12 Pro 256GB',
      deviceColor: 'Space Brown',
      deviceCondition: 'มือ 2',
      devicePrice: '14,400 บาท',
      downPayment: '3,000 บาท',
      installmentRate: '1,200 บาท',
      installmentMonths: '12 งวด',
      shopAmount: '14,400 บาท / 6%',
      simProvider: 'DTAC',
      createdAt: day(1)
    },
    {
      id: 'sample-4',
      fullName: 'กมลชนก แสงทอง',
      nickname: 'ก้อย',
      phone: '092-345-6789',
      lineId: 'kamon.sangthong',
      address: '9/12 หมู่ 2 ต.สันทรายหลวง อ.สันทราย จ.เชียงใหม่ 50210',
      companyName: 'โรงแรม ลานนา รีสอร์ท',
      companyAddress: '199 ถ.นิมมานเหมินท์ ต.สุเทพ อ.เมือง เชียงใหม่ 50200',
      companyPhone: '053-333-444',
      position: 'พนักงานต้อนรับ',
      salary: '16,500 บาท',
      workExperience: '2 ปี',
      ref1Name: 'อรทัย แสงทอง',
      ref1Nickname: 'อ้อ',
      ref1Phone: '093-111-2222',
      ref1Job: 'แม่บ้าน',
      ref1Relation: 'มารดา',
      ref2Name: 'ธนากร ใจกล้า',
      ref2Nickname: 'กอล์ฟ',
      ref2Phone: '094-333-4444',
      ref2Job: 'พนักงานโรงแรม',
      ref2Relation: 'เพื่อนร่วมงาน',
      guarantorName: 'อรทัย แสงทอง',
      guarantorNickname: 'อ้อ',
      guarantorPhone: '093-111-2222',
      guarantorJob: 'แม่บ้าน',
      guarantorIncome: '12,000 บาท/เดือน',
      guarantorRelation: 'มารดา',
      socialLinks: 'https://www.instagram.com/kamon.sangthong',
      deviceModel: 'iPhone 14 128GB',
      deviceColor: 'Blue',
      deviceCondition: 'มือ 2',
      devicePrice: '15,000 บาท',
      downPayment: '4,500 บาท',
      installmentRate: '1,500 บาท',
      installmentMonths: '10 งวด',
      shopAmount: '15,000 บาท / 5%',
      simProvider: 'AIS',
      createdAt: day(2)
    },
    {
      id: 'sample-5',
      fullName: 'ปิยะวัฒน์ จันทร์เพ็ญ',
      nickname: 'ปี',
      phone: '095-678-9012',
      lineId: 'piyawat.j',
      address: '234/56 หมู่ 5 ต.ท่าศาลา อ.ท่าศาลา จ.นครศรีธรรมราช 80160',
      companyName: 'บริษัท ซีฟู้ด สยาม จำกัด',
      companyAddress: '45/7 ถ.พัฒนาการคูขวาง ต.ในเมือง อ.เมือง นครศรีธรรมราช 80000',
      companyPhone: '075-444-555',
      position: 'พนักงานขับรถ',
      salary: '19,000 บาท',
      workExperience: '6 ปี',
      ref1Name: 'จันทร์ จันทร์เพ็ญ',
      ref1Nickname: 'จันทร์',
      ref1Phone: '096-111-3333',
      ref1Job: 'ประมง',
      ref1Relation: 'บิดา',
      ref2Name: 'สุรชัย ทองสุข',
      ref2Nickname: 'ชัย',
      ref2Phone: '097-222-4444',
      ref2Job: 'พนักงานขับรถ',
      ref2Relation: 'เพื่อนร่วมงาน',
      guarantorName: 'จันทร์ จันทร์เพ็ญ',
      guarantorNickname: 'จันทร์',
      guarantorPhone: '096-111-3333',
      guarantorJob: 'ประมง',
      guarantorIncome: '20,000 บาท/เดือน',
      guarantorRelation: 'บิดา',
      socialLinks: 'https://www.facebook.com/piyawat.janpen',
      deviceModel: 'Xiaomi 14T Pro 512GB',
      deviceColor: 'Titan Gray',
      deviceCondition: 'มือ 1',
      devicePrice: '24,000 บาท',
      downPayment: '6,000 บาท',
      installmentRate: '2,000 บาท',
      installmentMonths: '12 งวด',
      shopAmount: '24,000 บาท / 5%',
      simProvider: 'True',
      createdAt: day(3)
    }
  ];
}

function seedSampleApplications() {
  // อัปเดตตัวอย่างรุ่นเก่าให้มีฟิลด์ราคาเครื่อง/จำนวนงวด
  migrateSampleApplications();

  if (localStorage.getItem(SEED_KEY)) return;
  localStorage.setItem(SEED_KEY, '1');

  // ไม่ทับข้อมูลจริง ถ้ามีอยู่แล้ว
  if (loadApplications().length > 0) return;

  saveApplications(buildSampleApplications());
}

// ตัวอย่างรุ่นแรกเก็บเรทผ่อนรวมจำนวนงวดไว้ในช่องเดียว ("2,500 * 12 งวด")
// ฟังก์ชันนี้แยกออกเป็นเรทผ่อน + จำนวนงวด และเติมราคาเครื่องให้
function migrateSampleApplications() {
  const apps = loadApplications();
  let changed = false;

  apps.forEach(app => {
    if (!String(app.id || '').startsWith('sample-')) return;

    if (!app.installmentMonths && app.installmentRate) {
      const m = String(app.installmentRate).match(/^\s*([\d,]+)\s*\*\s*(\d+)\s*งวด\s*$/);
      if (m) {
        app.installmentRate = m[1] + ' บาท';
        app.installmentMonths = m[2] + ' งวด';
        changed = true;
      }
    }

    if (!app.devicePrice && app.shopAmount) {
      const price = String(app.shopAmount).split('/')[0].trim();
      if (price) {
        app.devicePrice = price;
        changed = true;
      }
    }
  });

  if (changed) saveApplications(apps);
}

document.addEventListener('DOMContentLoaded', function () {
  seedSampleApplications();
});
