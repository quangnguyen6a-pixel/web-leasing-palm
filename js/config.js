/* =========================================================
   PALM RIVER — SITE CONFIGURATION
   Prototype only. Central place for the project name, logo and
   data used by the sections below the Hero/Overview/USP block.

   CONTENT SOURCE: "Landing page Palm River (2).xlsx", worksheet
   "Section outline chuẩn" — Column D ("Text ver 1") is the approved
   content source; Column B is implementation guidance only; Column C
   and any embedded images are visual references only, not content.

   Source-priority rule applied where values conflicted: D5 (Bảng chi
   tiết dự án) > D3 (Content block giới thiệu tổng quan) > D2 (Hero).
   Concretely: building density is 25% everywhere on the site — the
   26% that appears in D2's raw text is the outdated value D5
   supersedes it with, per the brief's own explicit instruction.
   ========================================================= */
window.projectConfig = {
  projectName: "Palm River",
  /* No dedicated Palm River logo file was supplied with this content
     update — the existing project mark is kept rather than left
     blank or reconstructed. */
  projectLogo: "assets/palm-city-logo.png",
  language: "vi",
  hotline: "0969 696 201",
  hotlineHref: "tel:0969696201",
  zaloUrl: "https://zalo.me/1092029419951822931",
  whatsappUrl: "https://wa.me/message/KMD7G2CX3Y3QG1",

  /* -----------------------------------------------------
     IMAGE SLOTS — set the path here and it renders automatically, no
     layout/CSS changes needed. A slot left "" renders a neutral,
     correctly-proportioned placeholder frame (never a stock photo or
     "demo" label) instead.

     The approved riverside rendering (with "Nơi tái tạo năng lượng
     mỗi ngày" and the project logo embedded in it) remains the only
     architectural/lifestyle photo supplied so far, so it is still
     reused for both slots below — see the Amenities and Project
     Details sections in js/config.js for the same reasoning.
     Every other image referenced in this content update (D5, D7 x6,
     D9, D14 — all savills.sharepoint.com links, plus the D7
     palmrivercity.com reference) is hosted behind SharePoint auth or
     blocked by this environment's network policy and could not be
     fetched; each is reported in the final summary rather than
     silently left broken or swapped for a stock image.
     ----------------------------------------------------- */
  overviewImage: "assets/palm-city-overview-riverside.jpg",
  projectDetailImage: "assets/palm-city-overview-riverside.jpg"
};

/* -----------------------------------------------------
   PROJECT DETAILS — Row 5 "Bảng chi tiết dự án" (D5)
   All 14 fields below are approved values from D5, normalised per
   the brief (decimal commas, en dashes, "Nam Rạch Chiếc" spelling,
   "Bàn giao" split into time/standard). The D5 image
   (savills.sharepoint.com/.../IQCjmZPsBe1x...) could not be accessed
   — see projectConfig's comment above — so the existing approved
   riverside rendering is kept in this slot instead.
   ----------------------------------------------------- */
window.projectDetails = [
  { vi: "Vị trí", en: "Location", valueVi: "Khu đô thị Palm City, mặt tiền đường Song Hành, khu Nam Rạch Chiếc, phường Bình Trưng, TP.HCM", valueEn: "Palm City urban area, fronting Song Hanh Road, Nam Rach Chiec, Binh Trung Ward, Ho Chi Minh City", confirmed: true },
  { vi: "Chủ đầu tư", en: "Investor", valueVi: "Công ty TNHH Nam Rạch Chiếc", valueEn: "Nam Rach Chiec Co., Ltd.", confirmed: true },
  { vi: "Đơn vị phát triển", en: "Developer", valueVi: "Hướng Việt Properties", valueEn: "Huong Viet Properties", confirmed: true },
  { vi: "Đại lý phân phối F1", en: "F1 distribution agent", valueVi: "Savills Việt Nam", valueEn: "Savills Vietnam", confirmed: true },
  { vi: "Mật độ xây dựng", en: "Building density", valueVi: "Chỉ 25%", valueEn: "Only 25%", confirmed: true },
  { vi: "Quy mô căn hộ", en: "Number of units", valueVi: "620 căn tại 4 tháp", valueEn: "620 units across 4 towers", confirmed: true },
  { vi: "Loại hình sản phẩm", en: "Product types", valueVi: "Studio, 1PN, 2PN, 2PN đặc biệt, 3PN, 3PN đặc biệt, Duplex, Penthouse và Shophouse", valueEn: "Studio, 1BR, 2BR, 2BR Deluxe, 3BR, 3BR Deluxe, Duplex, Penthouse and Shophouse", confirmed: true },
  { vi: "Diện tích thông thủy", en: "Carpet area", valueVi: "41,3–157 m²", valueEn: "41.3–157 m²", confirmed: true },
  { vi: "Thang máy", en: "Lifts", valueVi: "5 thang/sàn", valueEn: "5 lifts per floor", confirmed: true },
  { vi: "Booking giữ chỗ", en: "Booking reservation", valueVi: "Từ 100 triệu VNĐ", valueEn: "From VND 100 million", confirmed: true },
  { vi: "Chiết khấu", en: "Discount", valueVi: "Đến 16,5%", valueEn: "Up to 16.5%", confirmed: true },
  { vi: "Khởi công", en: "Groundbreaking", valueVi: "16/06/2026", valueEn: "16 June 2026", confirmed: true },
  { vi: "Thời gian bàn giao", en: "Handover timeline", valueVi: "Cuối năm 2028", valueEn: "Late 2028", confirmed: true },
  { vi: "Tiêu chuẩn bàn giao", en: "Handover standard", valueVi: "Nội thất hoàn thiện", valueEn: "Fully furnished", confirmed: true }
];

/* -----------------------------------------------------
   CONNECTIVITY / LOCATION — Row 6 "Bản đồ & Liên kết vùng" (D6)
   Every item, grouping and travel time below matches D6 exactly,
   including "(tương lai)" labels on infrastructure that is not yet
   operational — none are shortened, reworded or removed, and none
   are presented as already built.
   ----------------------------------------------------- */
window.connectivityData = {
  "giao-thong": {
    vi: "Giao thông", en: "Transport",
    items: [
      { vi: "Ga Bình Trưng", en: "Binh Trung Station", time: "1 phút", timeEn: "1 min" },
      { vi: "Tuyến Metro Thủ Thiêm – Long Thành", en: "Thu Thiem – Long Thanh Metro Line", time: "3 phút", timeEn: "3 min" },
      { vi: "Nút giao An Phú", en: "An Phu Interchange", time: "3 phút", timeEn: "3 min" },
      { vi: "Cao tốc HCM – LT – DG", en: "HCMC – LT – DG Expressway", time: "3 phút", timeEn: "3 min" },
      { vi: "Ga Metro Thủ Thiêm", en: "Thu Thiem Metro Station", time: "5 phút", timeEn: "5 min" },
      { vi: "Sân bay Quốc tế Long Thành", en: "Long Thanh International Airport", time: "30 phút", timeEn: "30 min" },
      { vi: "Cầu Cát Lái (tương lai)", en: "Cat Lai Bridge (future)", time: "12 phút", timeEn: "12 min" },
      { vi: "Đường sắt cao tốc Bắc – Nam (tương lai)", en: "North–South High-Speed Railway (future)", time: "3 phút", timeEn: "3 min" }
    ]
  },
  "giao-duc": {
    vi: "Giáo dục", en: "Education",
    items: [
      { vi: "Trường Quốc tế Mỹ (TAS)", en: "The American School (TAS)", time: "3 phút", timeEn: "3 min" },
      { vi: "Trường Quốc tế Úc (AIS)", en: "Australian International School (AIS)", time: "7 phút", timeEn: "7 min" },
      { vi: "Trường Quốc tế Ngôi Sao Sài Gòn", en: "Saigon Star International School", time: "8 phút", timeEn: "8 min" },
      { vi: "Trường Quốc tế Việt Úc (VAS)", en: "Vietnam Australia School (VAS)", time: "10 phút", timeEn: "10 min" },
      { vi: "Trường Quốc tế Anne Hill", en: "Anne Hill International School", time: "12 phút", timeEn: "12 min" },
      { vi: "Trường Quốc tế TP.HCM (ISHCMC)", en: "International School Ho Chi Minh City (ISHCMC)", time: "20 phút", timeEn: "20 min" },
      { vi: "Trường Quốc tế Anh (BIS)", en: "British International School (BIS)", time: "17 phút", timeEn: "17 min" },
      { vi: "Đại học Quốc tế Sài Gòn (SIU)", en: "Saigon International University (SIU)", time: "12 phút", timeEn: "12 min" }
    ]
  },
  "tien-ich-song": {
    vi: "Tiện ích sống", en: "Lifestyle",
    items: [
      { vi: "Sân bay Quốc tế Long Thành (tương lai)", en: "Long Thanh International Airport (future)", time: "30 phút", timeEn: "30 min" },
      { vi: "Khu Liên hợp Thể thao Rạch Chiếc", en: "Rach Chiec Sports Complex", time: "5 phút", timeEn: "5 min" },
      { vi: "Vincom Mega Mall", en: "Vincom Mega Mall", time: "12 phút", timeEn: "12 min" },
      { vi: "Estella Place", en: "Estella Place", time: "12 phút", timeEn: "12 min" },
      { vi: "Thiso Mall", en: "Thiso Mall", time: "10 phút", timeEn: "10 min" },
      { vi: "Sân Golf Thủ Đức", en: "Thu Duc Golf Course", time: "15 phút", timeEn: "15 min" }
    ]
  },
  "dia-diem": {
    vi: "Địa điểm", en: "Landmarks",
    items: [
      { vi: "Trung tâm Tài chính Quốc tế Thủ Thiêm", en: "Thu Thiem International Financial Centre", time: "10 phút", timeEn: "10 min" },
      { vi: "Trung tâm Hành chính mới TP.HCM", en: "New HCMC Administrative Centre", time: "10 phút", timeEn: "10 min" },
      { vi: "Khu Trung tâm (Quận 1 cũ)", en: "City centre (former District 1)", time: "12 phút", timeEn: "12 min" }
    ]
  },
  "benh-vien": {
    vi: "Bệnh viện", en: "Hospitals",
    items: [
      { vi: "Bệnh viện Quốc tế (Palm)", en: "Palm International Hospital", time: "1 phút", timeEn: "1 min" },
      { vi: "Bệnh viện Quốc tế Mỹ (AIH)", en: "American International Hospital (AIH)", time: "8 phút", timeEn: "8 min" }
    ]
  }
};

/* -----------------------------------------------------
   AMENITIES — Row 7 "Tiện ích" (D7)
   Two tabs, per the brief: "Tiện ích Palm City" (the shared
   master-community amenity system) and "Tiện ích nội khu Palm River"
   (the project's own 68-item amenity list).
   ----------------------------------------------------- */

/* window.amenityGroups — single source for BOTH the (independent,
   auto-playing) amenity image carousel and the plain amenity list,
   for both level-1 tabs. Each group is { titleVi, titleEn, items,
   images } — items and images are two independent lists (an amenity
   never needs a 1:1 photo), per the brief. Group keys/order match the
   requested amenityGroups shape.

   Palm City → 4 category groups (retail / communityPark /
   riversidePromenade / sportWellness). D7's only instruction for this
   tab is "lấy text trong ảnh" pointing at
   palmrivercity.com/wp-content/uploads/2026/06/palm-city-1.jpg — that
   host is blocked by this environment's network policy (confirmed via
   a live fetch attempt, EGRESS_BLOCKED), so no approved item list
   exists yet for any of these 4 groups. `items` stays empty rather
   than inventing amenity names; see the empty-state note rendered by
   renderAmenityGroup() in js/sections.js and the final summary.

   Palm River → 4 floor groups (Tầng G / 1 / 2 / 20), full 68-item
   list from D7, numbering and wording preserved exactly as supplied. */
window.amenityGroups = {
  palmCity: {
    retail: { titleVi: "Khu thương mại", titleEn: "Retail precinct", items: [], images: [] },
    communityPark: { titleVi: "Công viên cộng đồng", titleEn: "Community park", items: [], images: [] },
    riversidePromenade: { titleVi: "Tuyến dạo bờ sông sinh thái", titleEn: "Eco riverside promenade", items: [], images: [] },
    sportWellness: { titleVi: "Thể thao & Sức khỏe", titleEn: "Sport & wellness", items: [], images: [] }
  },
  palmRiver: {
    ground: {
      titleVi: "Tầng G", titleEn: "Ground Floor",
      items: [
        { n: 1, vi: "Khu rèn luyện thể chất", en: "Fitness training area" },
        { n: 2, vi: "Trạm sạc xe điện thông minh", en: "Smart EV charging station" },
        { n: 3, vi: "Bãi đậu xe đạp chuyên dụng", en: "Dedicated bicycle parking" },
        { n: 4, vi: "Không gian thư giãn và chăm sóc sức khỏe", en: "Wellness and relaxation space" },
        { n: 5, vi: "Tuyến phố thương mại", en: "Retail street" },
        { n: 6, vi: "Sảnh đón tiếp rộng rãi", en: "Spacious reception lobby" },
        { n: 7, vi: "Sảnh thang máy riêng tư", en: "Private lift lobby" },
        { n: 8, vi: "Phòng nhận thư/Bưu phẩm", en: "Mail/parcel room" }
      ],
      images: []
    },
    floor1: {
      titleVi: "Tầng 1", titleEn: "Floor 1",
      items: [
        { n: 9, vi: "Vườn xanh tĩnh lặng", en: "Tranquil green garden" },
        { n: 10, vi: "Sân yoga ngoài trời", en: "Outdoor yoga deck" },
        { n: 11, vi: "Ốc đảo thư giãn", en: "Relaxation oasis" },
        { n: 12, vi: "Vườn BBQ thoáng đãng", en: "Open-air BBQ garden" },
        { n: 13, vi: "Sân chơi trẻ em trong nhà", en: "Indoor children's playground" },
        { n: 14, vi: "Sân cầu lông cao cấp", en: "Premium badminton court" },
        { n: 15, vi: "Hồ bơi an toàn cho trẻ", en: "Safe children's pool" },
        { n: 16, vi: "Hồ bơi 70m chuẩn resort", en: "70m resort-standard pool" },
        { n: 17, vi: "Vườn tản bộ ven hồ", en: "Lakeside walking garden" },
        { n: 18, vi: "Jacuzzi phục hồi thể lực", en: "Recovery jacuzzi" },
        { n: 19, vi: "Vườn thư giãn thác nước", en: "Waterfall relaxation garden" },
        { n: 20, vi: "Tổ hợp thương mại và ẩm thực", en: "Retail and dining complex" },
        { n: 21, vi: "Phòng massage trị liệu", en: "Therapeutic massage room" },
        { n: 22, vi: "Khu chăm sóc sức khỏe gia đình", en: "Family wellness area" },
        { n: 23, vi: "Phòng karaoke riêng tư", en: "Private karaoke room" },
        { n: 24, vi: "Rạp chiếu phim tại gia đẳng cấp", en: "Premium home cinema" },
        { n: 25, vi: "Sảnh sinh hoạt cộng đồng", en: "Community activity hall" },
        { n: 26, vi: "Sân chơi trải nghiệm cho bé", en: "Children's experience playground" },
        { n: 27, vi: "Không gian sinh hoạt đa năng", en: "Multi-purpose activity space" },
        { n: 28, vi: "Câu lạc bộ trẻ em", en: "Kids' club" },
        { n: 29, vi: "Sảnh đón/Trả khách sang trọng", en: "Elegant guest arrival/drop-off lobby" }
      ],
      images: []
    },
    floor2: {
      titleVi: "Tầng 2", titleEn: "Floor 2",
      items: [
        { n: 30, vi: "Đài ngắm cảnh view sông", en: "River-view observation deck" },
        { n: 31, vi: "Phố thương mại trên không", en: "Sky retail street" },
        { n: 32, vi: "Cảnh quan thủy sinh", en: "Aquatic landscape garden" },
        { n: 33, vi: "Khu ẩm thực ngoài trời", en: "Outdoor dining area" },
        { n: 34, vi: "Đài ngắm cảnh thành phố", en: "City-view observation deck" },
        { n: 35, vi: "Hồ nước tràn nghệ thuật", en: "Artistic infinity water feature" },
        { n: 36, vi: "Vườn dạo trên không", en: "Sky promenade garden" },
        { n: 37, vi: "Vườn hương thảo mộc", en: "Herb garden" },
        { n: 38, vi: "Sân chơi cho thú cưng", en: "Pet playground" },
        { n: 39, vi: "Không gian sự kiện ngoài trời", en: "Outdoor event space" },
        { n: 40, vi: "Thảm cỏ tự nhiên dưới tán cây", en: "Natural lawn under tree canopy" },
        { n: 41, vi: "Đường dạo bộ ven hồ", en: "Lakeside walking path" },
        { n: 42, vi: "Cung đường tản bộ ngắm cảnh", en: "Scenic walking trail" }
      ],
      images: []
    },
    floor20: {
      titleVi: "Tầng 20", titleEn: "Floor 20",
      items: [
        { n: 43, vi: "Phòng thủy nhiệt phục hồi và thải độc", en: "Hydrotherapy recovery and detox room" },
        { n: 44, vi: "Phòng trị liệu nhiệt hồng ngoại", en: "Infrared heat therapy room" },
        { n: 45, vi: "Bể ngâm lạnh phục hồi chuyên sâu", en: "Deep-recovery cold plunge pool" },
        { n: 46, vi: "Nhà hàng trên không", en: "Sky restaurant" },
        { n: 47, vi: "Cabana nghỉ dưỡng ven hồ", en: "Lakeside resort cabanas" },
        { n: 48, vi: "Bãi nghỉ dưỡng phong cách biển", en: "Beach-style relaxation deck" },
        { n: 49, vi: "Hồ bơi vô cực", en: "Infinity pool" },
        { n: 50, vi: "Phòng gym trên cao", en: "Sky gym" },
        { n: 51, vi: "Không gian học tập và sáng tạo", en: "Study and creative space" },
        { n: 52, vi: "Phòng golf mô phỏng", en: "Golf simulator room" },
        { n: 53, vi: "Khu giải trí thượng lưu", en: "Upscale entertainment area" },
        { n: 54, vi: "Sảnh tiệc/Lounge biệt lập", en: "Private function hall/lounge" },
        { n: 55, vi: "Cung đường tản bộ xanh", en: "Green walking trail" },
        { n: 56, vi: "Khu nghỉ ngơi giữa lòng hồ", en: "Mid-lake relaxation area" },
        { n: 57, vi: "Thang máy riêng biệt", en: "Dedicated lift" },
        { n: 58, vi: "Đài nghỉ dưỡng trên không", en: "Sky relaxation deck" },
        { n: 59, vi: "Góc thể thao ngoài trời", en: "Outdoor sports corner" },
        { n: 60, vi: "Vườn sinh thái", en: "Eco garden" },
        { n: 61, vi: "Onsen/Spa giữa tầng không", en: "Sky onsen/spa" },
        { n: 62, vi: "Khu vườn thưởng ngoạn đô thị", en: "Urban view garden" },
        { n: 63, vi: "Khu tiệc nướng BBQ trên cao", en: "Sky BBQ area" },
        { n: 64, vi: "Đài vọng cảnh", en: "Scenic viewing deck" },
        { n: 65, vi: "Không gian thiền/Yoga", en: "Meditation/yoga space" },
        { n: 66, vi: "Vườn đá trị liệu", en: "Therapeutic stone garden" },
        { n: 67, vi: "Vườn treo trên không", en: "Sky hanging garden" },
        { n: 68, vi: "Cung đường xanh đón gió", en: "Breezy green pathway" }
      ],
      images: []
    }
  }
};

window.amenityTabs = [
  { key: "palmCity", labelVi: "Tiện ích Palm City", labelEn: "Palm City amenities" },
  { key: "palmRiver", labelVi: "Tiện ích nội khu Palm River", labelEn: "Palm River in-residence amenities" }
];

/* -----------------------------------------------------
   FLOOR PLANS — Row 8 "Mặt bằng & Nhà mẫu" (D8)
   Area and the three approved benefit points per type come straight
   from D8 — nothing summarised, no direction/price/availability/
   furniture-package details invented. Per-type images were not part
   of this content update and stay unset (neutral placeholder).
   ----------------------------------------------------- */
window.floorPlanTypical = {
  headingVi: "Mặt bằng tầng điển hình", headingEn: "Typical floor layout",
  /* Empty by default — renders the "Thêm ảnh mặt bằng tại đây"
     placeholder in .glass-media-frame until an approved typical-
     floor drawing is supplied. Expected path noted in index.html. */
  image: "",
  points: [
    { titleVi: "Mật độ siêu riêng tư", titleEn: "Ultra-private density",
      textVi: "Chỉ 6 căn/tầng. Gần như 100% là căn góc (2 căn đơn lập tuyệt đối, 4 căn chỉ chung 1 vách tường).",
      textEn: "Only 6 units per floor. Nearly 100% corner units (2 fully detached corner units, 4 sharing only one party wall)." },
    { titleVi: "Thiết kế tối ưu", titleEn: "Optimised design",
      textVi: "Tỷ lệ thông thủy ưu việt đạt 89%–92%. 100% căn hộ sở hữu ban công và logia riêng biệt.",
      textEn: "A superior carpet-area ratio of 89%–92%. 100% of units have their own balcony and logia." },
    { titleVi: "Đặc quyền di chuyển", titleEn: "Movement privilege",
      textVi: "Tỷ lệ 5 thang máy cho 6 căn/tầng. Lõi thang độc lập không chung tường căn hộ giúp cách âm tuyệt đối, sảnh chờ ốp kính panorama thư giãn.",
      textEn: "A ratio of 5 lifts for 6 units per floor. An independent lift core with no shared apartment walls ensures total soundproofing, with a panorama-glazed waiting lobby." },
    { titleVi: "Kiến trúc “thở” tự nhiên", titleEn: "Naturally “breathing” architecture",
      textVi: "Hành lang ngắn kết hợp khe thoáng chữ L giúp đối lưu khí tươi và đón ánh sáng tự nhiên xuyên suốt từ 4 phía, triệt tiêu mọi góc tối.",
      textEn: "Short corridors combined with L-shaped air gaps enable fresh-air circulation and natural light from all 4 sides, eliminating dark corners." }
  ]
};

window.floorPlanTypes = [
  {
    id: "studio", vi: "Studio", en: "Studio",
    areaVi: "41,3 m²", areaEn: "41.3 m²",
    image: "", expectedAsset: "assets/floor-plans/studio.jpg",
    benefits: [
      { vi: "Tối ưu không gian: Thiết kế mở xuyên suốt không vách ngăn, tận dụng triệt để từng mét vuông sử dụng.", en: "Space-optimised: Open-plan design with no partitions, making full use of every square metre." },
      { vi: "Mặt tiền kính cực đại: Đón sáng và gió tự nhiên hoàn hảo nhờ dải cửa kính trải dài toàn bộ mặt tiền căn hộ.", en: "Maximum glass frontage: Perfect natural light and airflow thanks to a glass façade spanning the entire unit frontage." },
      { vi: "Phù hợp đầu tư: Diện tích nhỏ gọn, linh hoạt công năng, đảm bảo tính thanh khoản và tỷ suất cho thuê vượt trội.", en: "Investment-friendly: A compact, flexible layout that ensures strong liquidity and rental yield." }
    ]
  },
  {
    id: "1pn", vi: "1PN", en: "1BR",
    areaVi: "65,9 m²", areaEn: "65.9 m²",
    image: "", expectedAsset: "assets/floor-plans/1pn.jpg",
    benefits: [
      { vi: "Diện tích hiếm có: 65,9m² cho phân khúc 1 phòng ngủ, mang lại không gian sống rộng rãi cho người độc thân và cặp đôi.", en: "Rare floor area: 65.9m² for the 1-bedroom segment, offering spacious living for singles and couples." },
      { vi: "Kính bo cong nghệ thuật: Phòng khách sở hữu hệ kính bo tròn góc tinh tế, mở rộng tầm nhìn Panorama tuyệt mỹ.", en: "Artistic curved glazing: The living room features an elegant curved-corner glass system, opening onto a stunning panoramic view." },
      { vi: "Riêng tư & Sang trọng: Phòng ngủ tách biệt hoàn toàn với khu vực sinh hoạt chung rộng lớn, đảm bảo sự yên tĩnh tuyệt đối.", en: "Private & refined: The bedroom is fully separated from the large shared living area, ensuring total quiet." }
    ]
  },
  {
    id: "2pn", vi: "2PN", en: "2BR",
    areaVi: "84,9–85,9 m²", areaEn: "84.9–85.9 m²",
    image: "", expectedAsset: "assets/floor-plans/2pn.jpg",
    benefits: [
      { vi: "Tầm nhìn đa diện: 100% là căn góc (gồm 2 căn góc bo tròn kính panorama và 1 căn góc chuẩn).", en: "Multi-angle views: 100% corner units (including 2 curved panorama-glass corner units and 1 standard corner unit)." },
      { vi: "Thiết kế vuông vức: Bố trí công năng thông minh, triệt tiêu hoàn toàn các góc chết.", en: "Squared-off design: A smart functional layout that eliminates all dead corners." },
      { vi: "Tối ưu diện tích: Không có hành lang thừa bên trong, tỷ lệ diện tích thông thủy cực cao.", en: "Optimised area: No wasted internal corridor space, for a very high carpet-area ratio." }
    ]
  },
  {
    id: "2pn-dac-biet", vi: "2PN đặc biệt", en: "2BR Deluxe",
    areaVi: "120,2 m²", areaEn: "120.2 m²",
    image: "", expectedAsset: "assets/floor-plans/2pn-dac-biet.jpg",
    benefits: [
      { vi: "Phòng khách: Không gian sinh hoạt chung cực lớn kết hợp hệ cửa lùa 6 cánh panorama.", en: "Living room: An extra-large shared living space paired with a 6-panel panoramic sliding-door system." },
      { vi: "Bếp đôi đẳng cấp: Phân tách hoàn toàn khu vực bếp khô và bếp ướt riêng biệt.", en: "Dual premium kitchen: Fully separated dry and wet kitchen areas." },
      { vi: "Đặc quyền Powder Room: Bố trí thêm WC dành riêng cho khách – thiết kế cực hiếm tại phân khúc 2 phòng ngủ.", en: "Powder room privilege: An additional guest WC — an exceptionally rare feature in the 2-bedroom segment." }
    ]
  },
  {
    id: "3pn", vi: "3PN", en: "3BR",
    areaVi: "126,1 m²", areaEn: "126.1 m²",
    image: "", expectedAsset: "assets/floor-plans/3pn.jpg",
    benefits: [
      { vi: "Master Suite đẳng cấp: Phòng ngủ chính sở hữu tầm nhìn góc rộng, đi kèm hệ thống phòng tắm lớn trang bị bồn tắm thư giãn.", en: "Premium master suite: The master bedroom enjoys a wide corner view, with a large en-suite bathroom fitted with a relaxation bathtub." },
      { vi: "Bếp kín chuyên biệt: Tách biệt hoàn toàn khu vực nấu nướng, ngăn ám mùi hiệu quả – thiết kế “đo ni đóng giày” cho gia đình Việt.", en: "Dedicated enclosed kitchen: A fully separated cooking area for effective odour control — tailor-made for Vietnamese families." },
      { vi: "Không gian chung thoáng đãng: Khu vực phòng khách và phòng ăn vuông vức, rộng lớn, dễ dàng bố trí nội thất sang trọng.", en: "Airy shared spaces: Square, spacious living and dining areas that are easy to furnish elegantly." }
    ]
  },
  {
    id: "3pn-dac-biet", vi: "3PN đặc biệt", en: "3BR Deluxe",
    areaVi: "157,0 m²", areaEn: "157.0 m²",
    image: "", expectedAsset: "assets/floor-plans/3pn-dac-biet.jpg",
    benefits: [
      { vi: "Kính bo cong Panorama: Phòng Master sở hữu hệ kính bo tròn nghệ thuật, tối đa hóa tầm nhìn ngoạn mục.", en: "Panoramic curved glazing: The master bedroom features an artistic curved-glass system, maximising the spectacular view." },
      { vi: "Tiện nghi thượng lưu: Bố trí 2 phòng tắm lớn kết hợp cùng 1 Powder Room (WC dành riêng cho khách).", en: "Upscale amenities: Two large bathrooms plus one powder room (guest WC)." },
      { vi: "Bếp kín chuyên biệt: Tách biệt hoàn toàn với phòng ăn, ngăn mùi tuyệt đối – thiết kế hoàn hảo cho văn hóa ẩm thực gia đình Á Đông.", en: "Dedicated enclosed kitchen: Fully separated from the dining room for total odour control — perfectly suited to Asian family cooking culture." }
    ]
  }
];

/* -----------------------------------------------------
   CONSTRUCTION PROGRESS — Row 10 "Tiến độ xây dựng" (D10)
   D10 states additional images are still required from Residential.
   No milestones/dates exist yet — kept empty on purpose.
   ----------------------------------------------------- */
window.progressMilestones = [];

/* -----------------------------------------------------
   SAVILLS / SAVILLS RESIDENTIAL — Rows 11 & 13 (D11)
   Corporate intro, Residential intro and the three commitments below
   are the approved copy from D11, split to match the two existing
   page sections (#savills for the corporate intro + commitments,
   #residential for the Residential intro) — the meaning of each
   paragraph is unchanged from D11, only its placement follows the
   existing layout.
   ----------------------------------------------------- */
window.savillsAbout = {
  corporateHeadingVi: "Savills – Thương hiệu bất động sản toàn cầu hơn 165 năm",
  corporateHeadingEn: "Savills – A Global Real Estate Brand for Over 165 Years",
  corporateBodyVi: "Thành lập năm 1855 tại Vương quốc Anh, Savills hiện là một trong những tập đoàn tư vấn và quản lý bất động sản hàng đầu thế giới với mạng lưới hơn 700 văn phòng tại Châu Mỹ, Châu Âu, Châu Á – Thái Bình Dương, Châu Phi và Trung Đông. Có mặt từ năm 1995 tại Việt Nam, Savills là công ty tư vấn BĐS quốc tế lâu đời và quy mô hàng đầu, liên tục được vinh danh tại các giải thưởng danh giá.",
  corporateBodyEn: "Founded in 1855 in the United Kingdom, Savills is now one of the world's leading real estate consultancy and management groups, with a network of more than 700 offices across the Americas, Europe, Asia-Pacific, Africa and the Middle East. Present in Vietnam since 1995, Savills is one of the country's longest-established and largest international real estate consultancies, consistently recognised at prestigious industry awards.",
  residentialHeadingVi: "Savills Residential – Chuyên gia bất động sản nhà ở cao cấp",
  residentialHeadingEn: "Savills Residential – Premium Residential Real Estate Experts",
  residentialBodyVi: "Bộ phận Bất động sản Nhà ở của Savills là cầu nối tin cậy giữa các chủ đầu tư danh tiếng và cộng đồng khách hàng. Chúng tôi cung cấp giải pháp toàn diện từ tư vấn chọn căn, chiến lược tài chính, pháp lý minh bạch cho đến hỗ trợ thủ tục chuyển nhượng và quản lý tài sản sau bán hàng.",
  residentialBodyEn: "Savills' Residential division is a trusted bridge between reputable developers and the customer community. We provide end-to-end solutions — from unit-selection advisory and financial strategy to transparent legal guidance, transfer support and post-sale asset management.",
  commitments: [
    { titleVi: "Thông tin chính thống & Minh bạch", titleEn: "Official & Transparent Information",
      textVi: "Đảm bảo 100% rổ hàng, chính sách bán hàng, bảng giá và ưu đãi chiết khấu trực tiếp từ Chủ đầu tư Hướng Việt Properties.",
      textEn: "A 100% guarantee that unit inventory, sales policy, price list and discount incentives come directly from developer Huong Viet Properties." },
    { titleVi: "Đặc quyền giỏ hàng đẹp nhất", titleEn: "Priority Access to the Best Units",
      textVi: "Khách hàng được tiếp cận sớm nhất với các quỹ căn view sông, căn góc và vị trí tầng đẹp nhất dự án.",
      textEn: "Customers get first access to river-view units, corner units and the best floor positions in the project." },
    { titleVi: "Đồng hành chuyên nghiệp 1:1", titleEn: "Professional 1:1 Support",
      textVi: "Đội ngũ chuyên viên tư vấn được đào tạo chuyên sâu, bảo mật thông tin tuyệt đối và hỗ trợ xuyên suốt toàn bộ quy trình giao dịch.",
      textEn: "A highly trained advisory team, with absolute confidentiality and support throughout the entire transaction process." }
  ]
};

/* -----------------------------------------------------
   PRESS ARTICLES — Row 12 (D12)
   One shared, un-translated record per article (a real published
   headline/publisher isn't re-translated for the EN toggle — only the
   surrounding UI labels are). The two entries below are the only
   confirmed source URLs from D12; title/excerpt/date/logo/image were
   never supplied for either, so they stay empty and render as an
   honest editable-placeholder label (see renderPressArticles() in
   js/sections.js) rather than an invented headline or a broken image.
   Fill in any field here and it appears on the card automatically.
   ----------------------------------------------------- */
window.pressArticles = [
  {
    publisher: "Savills Việt Nam",
    logo: "",
    title: "",
    excerpt: "",
    date: "",
    url: "https://vn.savills.com.vn/blog/article/238470/vietnam-viet/du-an-ven-song-sai-gon.aspx#palm-river",
    image: ""
  },
  {
    publisher: "Savills Việt Nam",
    logo: "",
    title: "",
    excerpt: "",
    date: "",
    url: "https://www.facebook.com/SavillsVietnam/posts/savills-vi%E1%BB%87t-nam-%C4%91%C6%B0%E1%BB%A3c-b%E1%BB%95-nhi%E1%BB%87m-l%C3%A0m-%C4%91%E1%BB%91i-t%C3%A1c-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-qu%E1%BB%91c-t%E1%BA%BF-c%E1%BB%A7a-palm-river-d%E1%BB%B1-/1558683272966044/",
    image: ""
  }
];

/* -----------------------------------------------------
   FINAL FORM / POPUP — Row 14 "Form đăng ký" (D14)
   Shared field + option data so the final-page form and the
   registration popup stay identical. The D14 image
   (savills.sharepoint.com/.../IQDCGKC2xRU5...) could not be accessed
   (see projectConfig's comment) — the final form keeps its existing
   approved image instead.
   ----------------------------------------------------- */
window.registrationForm = {
  headingVi: "Đăng ký tư vấn cùng chuyên gia Savills",
  headingEn: "Register for Consultation with a Savills Expert",
  paragraphVi: "Đăng ký để được tư vấn bảng giá dự kiến, layout chi tiết và chính sách bán hàng đợt 1 trực tiếp từ Chủ đầu tư Hướng Việt và Savills Việt Nam.",
  paragraphEn: "Register to receive advice on the indicative price list, detailed layouts and the first sales policy directly from developer Huong Viet and Savills Vietnam.",
  purposeOptions: [
    { value: "o-de-o", vi: "Mua để ở", en: "Live-in" },
    { value: "dau-tu", vi: "Đầu tư", en: "Investment" },
    { value: "second-home", vi: "Second home", en: "Second home" },
    { value: "cho-thue", vi: "Cho thuê", en: "Rental" }
  ],
  productOptions: [
    { value: "1pn", vi: "1 phòng ngủ (1PN)", en: "1 bedroom (1BR)" },
    { value: "2pn", vi: "2 phòng ngủ (2PN)", en: "2 bedrooms (2BR)" },
    { value: "3pn", vi: "3 phòng ngủ (3PN)", en: "3 bedrooms (3BR)" },
    { value: "duplex-penthouse", vi: "Duplex/Penthouse", en: "Duplex/Penthouse" },
    { value: "shophouse", vi: "Shophouse", en: "Shophouse" }
  ],
  budgetOptions: [
    { value: "duoi-15", vi: "Dưới 15 tỷ", en: "Under VND 15 billion" },
    { value: "15-20", vi: "15 – 20 tỷ", en: "VND 15–20 billion" },
    { value: "20-25", vi: "20 – 25 tỷ", en: "VND 20–25 billion" },
    { value: "tren-25", vi: "Trên 25 tỷ", en: "Over VND 25 billion" }
  ]
};
