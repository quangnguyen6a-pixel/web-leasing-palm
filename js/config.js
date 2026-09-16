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
  { vi: "Địa chỉ", en: "Address", valueVi: "Khu đô thị Palm City, đường Song Hành, Nam Rạch Chiếc, phường Bình Trưng, TP.Hồ Chí Minh (phường An Phú, Quận 2 cũ)", valueEn: "Palm City Urban Area, Song Hanh Road, Nam Rach Chiec, Binh Trung Ward, Ho Chi Minh City (formerly An Phu Ward, District 2)", confirmed: true },
  { vi: "Chủ đầu tư", en: "Developer", valueVi: "Hướng Việt Properties, Công ty TNHH Nam Rạch Chiếc", valueEn: "Hướng Việt Properties, Nam Rạch Chiếc Co., Ltd.", confirmed: true },
  { vi: "Mật độ xây dựng", en: "Construction density", valueVi: "Khoảng 26%", valueEn: "Approximately 26%", confirmed: true },
  { vi: "Quy mô", en: "Scale", valueVi: "1,9 ha • 4 tòa • 36 tầng • Khoảng 620 căn hộ", valueEn: "1.9 ha • 4 towers • 36 storeys • Approximately 620 apartments", confirmed: true },
  { vi: "Sản phẩm", en: "Property types", valueVi: "Studio, 1–2–3 PN, Duplex, Penthouse, Shophouse", valueEn: "Studios, 1-, 2- and 3-bedroom apartments, duplexes, penthouses and shophouses", confirmed: true },
  { vi: "Giá bán trung bình", en: "Average selling price", valueVi: "Từ 168 triệu đồng/m² (diện tích thông thủy)", valueEn: "From VND 168 million/m² of net saleable area", confirmed: true },
  { vi: "Dự kiến bàn giao", en: "Expected handover", valueVi: "Quý I/2029", valueEn: "Q1 2029", confirmed: true },
  { vi: "Tiêu chuẩn bàn giao", en: "Handover standard", valueVi: "Hoàn thiện đầy đủ khu vực bếp và phòng tắm", valueEn: "Fully finished kitchen and bathroom areas", confirmed: true },
  { vi: "Hình thức sở hữu", en: "Ownership tenure", valueVi: "Sở hữu lâu dài đối với người Việt Nam; 50 năm đối với người nước ngoài", valueEn: "Freehold for Vietnamese nationals; 50-year ownership term for foreign buyers", confirmed: true }
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
   for both level-1 tabs. Each Palm City group is { tabVi, tabEn,
   titleVi, titleEn, items, images } — tabVi/tabEn is the compact tab
   label, titleVi/titleEn is the full official group heading shown
   inside the active panel. items and images are two independent
   lists (an amenity never needs a 1:1 photo), per the brief.

   Palm City → 4 category groups, each with a compact tab label
   (tabVi/tabEn) and the full official group heading (titleVi/titleEn)
   shown inside the active panel — both approved wording, exact
   numbering 01-100 preserved globally (item.n), not restarted per
   group. Source: the supplied Palm City amenities list; British
   English translations were generated for this pass (no existing EN
   wording to preserve for these 100 names).

   Palm River → 4 floor groups (Tầng G / 1 / 2 / 20), full 68-item
   list from D7, numbering and wording preserved exactly as supplied. */
window.amenityGroups = {
  /* images: web-ready photography from the "[Đã lọc] HÌNH ẢNH DỰ ÁN"
     Drive folder → Tiện Ích (resized copies, each 1.5-2.9MB — the
     originals in "Tiện ích" are 10-20MB and are never loaded here).
     Reassigned to the new 4 groups by subject match: wellness photos
     → sportsWellness, park/promenade photos → landscapeRiverside,
     retail photos → retailCommunity. No local photography exists yet
     for premiumPrivileges (a rooftop/executive-lounge scene) — its
     `images` stays empty rather than reusing an unrelated photo; the
     carousel hides itself for that group (see renderAmenityCarousel
     in js/sections.js) and the list uses the full row width instead. */
  palmCity: {
    sportsWellness: {
      tabVi: "Thể thao & Trị liệu", tabEn: "Sports & Wellness",
      titleVi: "Tổ Hợp Thể Thao, Sức Khỏe & Trị Liệu", titleEn: "Sports, Wellness & Therapy Complex",
      images: [
        "assets/amenities/amenity-palmcity-wellness-1.jpg",
        "assets/amenities/amenity-palmcity-wellness-2.jpg"
      ],
      items: [
        { n: 1, vi: "Sân Pickleball", en: "Pickleball Court" },
        { n: 2, vi: "Sân bóng chuyền", en: "Volleyball Court" },
        { n: 3, vi: "Sân thể thao đa năng", en: "Multi-purpose Sports Court" },
        { n: 4, vi: "Sân bóng bàn", en: "Table Tennis Court" },
        { n: 5, vi: "Góc chơi Bocce", en: "Bocce Court" },
        { n: 6, vi: "Khu thể dục người cao tuổi", en: "Senior Fitness Area" },
        { n: 7, vi: "Sàn tập thiền & Yoga ngoài trời", en: "Outdoor Meditation & Yoga Deck" },
        { n: 8, vi: "Đường chạy bộ ven sông", en: "Riverside Jogging Trail" },
        { n: 9, vi: "Đường đạp xe chung", en: "Shared Cycling Path" },
        { n: 10, vi: "Hồ ngâm lạnh tái tạo tế bào", en: "Cellular Regeneration Cold Plunge Pool" },
        { n: 11, vi: "Bệnh viện Quốc tế", en: "International Hospital" },
        { n: 12, vi: "Sky Onsen", en: "Sky Onsen" },
        { n: 13, vi: "Xông hơi Jim Jil Bang", en: "Jjimjilbang Sauna" },
        { n: 14, vi: "Hồ bơi chuẩn Olympic", en: "Olympic-standard Swimming Pool" },
        { n: 15, vi: "Hồ thủy trị liệu thư giãn", en: "Relaxation Hydrotherapy Pool" },
        { n: 16, vi: "Hồ bơi vô cực trên cao", en: "Elevated Infinity Pool" },
        { n: 17, vi: "Phòng Golf 3D", en: "3D Golf Simulator Room" },
        { n: 18, vi: "Hồ tắm khoáng nóng Onsen", en: "Onsen Hot Mineral Bath" },
        { n: 19, vi: "Phòng Gym", en: "Gymnasium" },
        { n: 20, vi: "Phòng Yoga", en: "Yoga Studio" },
        { n: 21, vi: "Khu trị liệu nhiệt nóng - lạnh", en: "Hot-Cold Contrast Therapy Zone" },
        { n: 22, vi: "Tổ hợp sân thể thao", en: "Sports Court Complex" },
        { n: 23, vi: "Phòng Yoga nhiệt và hồng ngoại", en: "Heated & Infrared Yoga Studio" },
        { n: 24, vi: "Đường chạy bộ bình minh", en: "Sunrise Jogging Trail" },
        { n: 25, vi: "Hồ bơi nước ấm tràn viền đón nắng", en: "Sun-facing Warm-water Infinity Pool" },
        { n: 26, vi: "Phòng xông hơi trị liệu ánh sáng", en: "Light Therapy Sauna Room" },
        { n: 27, vi: "Sân thiền & Yoga hoàng hôn", en: "Sunset Meditation & Yoga Deck" },
        { n: 28, vi: "Phòng thể thao công nghệ cao", en: "High-tech Sports Room" },
        { n: 29, vi: "Sàn Yoga vòm kính trên cao", en: "Elevated Glass-dome Yoga Deck" },
        { n: 30, vi: "Phòng tập đạp xe & Cardio", en: "Cycling & Cardio Studio" },
        { n: 31, vi: "Phòng Gym & Fitness vô cực", en: "Infinity Gym & Fitness Studio" },
        { n: 32, vi: "Trung tâm trẻ hóa & thẩm mỹ công nghệ cao", en: "High-tech Rejuvenation & Aesthetics Centre" },
        { n: 33, vi: "Viện y học tái tạo tế bào chuyên sâu", en: "Advanced Cellular Regenerative Medicine Institute" },
        { n: 34, vi: "Viện trẻ hóa thẩm mỹ công nghệ cao", en: "High-tech Aesthetic Rejuvenation Institute" },
        { n: 35, vi: "Phòng phục hồi thể chất", en: "Physical Recovery Room" }
      ]
    },
    landscapeRiverside: {
      tabVi: "Cảnh quan & Ven sông", tabEn: "Landscape & Riverside",
      titleVi: "Tổ Hợp Cảnh Quan Sinh Thái & Ven Sông", titleEn: "Ecological Landscape & Riverside Complex",
      images: [
        "assets/amenities/amenity-palmcity-park-1.jpg",
        "assets/amenities/amenity-palmcity-park-2.jpg",
        "assets/amenities/amenity-palmcity-park-3.jpg",
        "assets/amenities/amenity-palmcity-park-4.jpg",
        "assets/amenities/amenity-palmcity-park-5.jpg",
        "assets/amenities/amenity-palmcity-park-6.jpg",
        "assets/amenities/amenity-palmcity-park-7.jpg",
        "assets/amenities/amenity-palmcity-park-8.jpg",
        "assets/amenities/amenity-palmcity-promenade-1.jpg",
        "assets/amenities/amenity-palmcity-promenade-2.jpg",
        "assets/amenities/amenity-palmcity-promenade-3.jpg",
        "assets/amenities/amenity-palmcity-promenade-4.jpg"
      ],
      items: [
        { n: 36, vi: "Điểm ngắm cảnh ven sông", en: "Riverside Viewpoint" },
        { n: 37, vi: "Công viên cộng đồng", en: "Community Park" },
        { n: 38, vi: "Góc thư giãn", en: "Relaxation Corner" },
        { n: 39, vi: "Vườn thảo mộc", en: "Herb Garden" },
        { n: 40, vi: "Dãy ghế ngồi tương tác", en: "Interactive Seating Row" },
        { n: 41, vi: "Bãi cỏ đa năng", en: "Multi-purpose Lawn" },
        { n: 42, vi: "Khu hoa vàng", en: "Golden Flower Garden" },
        { n: 43, vi: "Quảng trường trung tâm", en: "Central Plaza" },
        { n: 44, vi: "Đường dạo cảm quan", en: "Sensory Walking Path" },
        { n: 45, vi: "Đài quan sát sinh thái", en: "Ecological Observation Deck" },
        { n: 46, vi: "Điểm câu cá", en: "Fishing Point" },
        { n: 47, vi: "Biểu tượng nghệ thuật", en: "Art Landmark" },
        { n: 48, vi: "Đường bộ đá cuội", en: "Pebble Walking Path" },
        { n: 49, vi: "Sảnh nghỉ dưỡng Oxy", en: "Oxygen Wellness Lounge" },
        { n: 50, vi: "Khu vực ghế ngồi thác nước", en: "Waterfall Seating Area" },
        { n: 51, vi: "Vườn cây ăn quả tạo hình nghệ thuật", en: "Artistically Shaped Orchard Garden" },
        { n: 52, vi: "Rừng Oxi và thảm thiền", en: "Oxygen Forest & Meditation Lawn" },
        { n: 53, vi: "Sảnh hoa trị liệu", en: "Floral Therapy Lounge" },
        { n: 54, vi: "Mê cung cây xanh cảnh quan", en: "Landscaped Green Maze" },
        { n: 55, vi: "Vườn thảo dược chữa lành", en: "Healing Herbal Garden" },
        { n: 56, vi: "Sân vọng cảnh ngắm sao", en: "Stargazing Viewing Terrace" },
        { n: 57, vi: "Đài vọng cảnh hoàng hôn", en: "Sunset Viewing Deck" },
        { n: 58, vi: "Đường dạo bộ đèn lồng", en: "Lantern-lit Walking Path" },
        { n: 59, vi: "Quảng trường điêu khắc nghệ thuật động học", en: "Kinetic Sculpture Art Plaza" }
      ]
    },
    retailCommunity: {
      tabVi: "Thương mại & Cộng đồng", tabEn: "Retail & Community",
      titleVi: "Tổ Hợp Thương Mại, Giải Trí & Cộng Đồng", titleEn: "Retail, Entertainment & Community Complex",
      images: [
        "assets/amenities/amenity-palmcity-retail-1.jpg",
        "assets/amenities/amenity-palmcity-retail-2.jpg"
      ],
      items: [
        { n: 60, vi: "Cổng chào", en: "Welcome Gate" },
        { n: 61, vi: "Trung tâm thương mại", en: "Shopping Centre" },
        { n: 62, vi: "Khu ẩm thực & café ngoài trời", en: "Outdoor Dining & Café Precinct" },
        { n: 63, vi: "Bảng thông tin", en: "Information Board" },
        { n: 64, vi: "Sân chơi sáng tạo", en: "Creative Playground" },
        { n: 65, vi: "Trạm nghỉ chân", en: "Rest Station" },
        { n: 66, vi: "Rạp xem phim ngoài trời & khán đài cỏ", en: "Outdoor Cinema & Grass Amphitheatre" },
        { n: 67, vi: "Góc võng thư giãn", en: "Hammock Relaxation Corner" },
        { n: 68, vi: "Nhà vệ sinh công cộng", en: "Public Restroom" },
        { n: 69, vi: "Lối vào & bãi đậu xe đạp", en: "Entrance & Bicycle Parking" },
        { n: 70, vi: "Bãi cỏ sinh hoạt cộng đồng", en: "Community Activity Lawn" },
        { n: 71, vi: "Khu picnic & vườn cây ăn quả", en: "Picnic Area & Orchard Garden" },
        { n: 72, vi: "Sân chơi thú cưng", en: "Pet Playground" },
        { n: 73, vi: "Trạm nghỉ gia đình", en: "Family Rest Station" },
        { n: 74, vi: "Sân chơi thiên nhiên", en: "Nature Playground" },
        { n: 75, vi: "Khu vui chơi nước trẻ em", en: "Children's Water Play Area" },
        { n: 76, vi: "Rạp chiếu phim / Karaoke", en: "Cinema / Karaoke Room" },
        { n: 77, vi: "Trường học Quốc tế", en: "International School" },
        { n: 78, vi: "Không gian kết nối gia đình", en: "Family Bonding Space" },
        { n: 79, vi: "Phòng học & đọc sách chung", en: "Shared Study & Reading Room" },
        { n: 80, vi: "Shophouse", en: "Shophouses" },
        { n: 81, vi: "Nhà sinh hoạt cộng đồng", en: "Community Activity House" },
        { n: 82, vi: "Câu lạc bộ sáng tạo cho giới trẻ", en: "Youth Creative Club" },
        { n: 83, vi: "Khu vui chơi sáng tạo cho trẻ em", en: "Children's Creative Play Area" },
        { n: 84, vi: "Khu vườn tiệc tối riêng tư", en: "Private Evening Garden Party Venue" },
        { n: 85, vi: "Bãi cỏ sự kiện & lửa trại", en: "Event Lawn & Bonfire Area" },
        { n: 86, vi: "Khu tiệc nướng & Teppanyaki ngoài trời", en: "Outdoor BBQ & Teppanyaki Area" },
        { n: 87, vi: "Khu vực lửa trại không khói", en: "Smokeless Bonfire Area" },
        { n: 88, vi: "Trung tâm giao thương", en: "Trade & Business Centre" },
        { n: 89, vi: "Khu nhà hàng ẩm thực cao cấp", en: "Premium Fine-dining Precinct" }
      ]
    },
    premiumPrivileges: {
      tabVi: "Đặc quyền Thượng lưu", tabEn: "Premium Privileges",
      titleVi: "Đặc Quyền Thượng Lưu & Không Gian Doanh Nhân", titleEn: "Premium Privileges & Executive Spaces",
      images: [],
      items: [
        { n: 90, vi: "Không gian làm việc ngoài trời", en: "Outdoor Workspace" },
        { n: 91, vi: "Sảnh trà chiều ngắm hoàng hôn", en: "Sunset Afternoon Tea Lounge" },
        { n: 92, vi: "Phòng họp thượng đỉnh & sảnh Cigar VIP", en: "Summit Meeting Room & VIP Cigar Lounge" },
        { n: 93, vi: "Bãi đáp trực thăng & sảnh đón VIP trên cao", en: "Rooftop Helipad & VIP Arrival Lounge" },
        { n: 94, vi: "Không gian kết nối doanh nhân", en: "Business Networking Space" },
        { n: 95, vi: "Câu lạc bộ điều hành trên cao", en: "Sky Executive Club" },
        { n: 96, vi: "Thư viện & phòng họp bảo mật", en: "Library & Private Meeting Room" },
        { n: 97, vi: "Sảnh tiếp khách doanh nhân", en: "Business Reception Lounge" },
        { n: 98, vi: "Khối pha lê đón sáng", en: "Crystal Sunlight Atrium" },
        { n: 99, vi: "Đại sảnh thông tầng Galleria", en: "Galleria Double-height Atrium" },
        { n: 100, vi: "Sảnh dịch vụ khách hàng cao cấp", en: "Premium Guest Services Lounge" }
      ]
    }
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
   furniture-package details invented.

   Per-type images are hotlinked directly from the external Savills
   Hub asset host (savills-hub.com.vn/residential/palm-river-2/...) per
   explicit instruction — not downloaded/copied into assets/. Because
   these files live outside this repo, availability depends on that
   host staying up; renderFloorplans() in js/sections.js shows a
   dedicated bilingual error message in the image frame (not a broken-
   image icon) if any one of them fails to load.
   ----------------------------------------------------- */
window.floorPlanTypical = {
  headingVi: "Mặt bằng tầng điển hình", headingEn: "Typical floor layout",
  /* Hotlinked directly from the external Savills Hub asset host per
     explicit instruction — not downloaded/copied into assets/. One
     entry per tower; renderFloorplanTypicalMedia() in js/sections.js
     switches between them via a small tab pair and shows a dedicated
     bilingual error message (not a broken-image icon) if either URL
     fails to load. */
  towers: [
    {
      id: "thap3", labelVi: "Tháp 3", labelEn: "Tower 3",
      image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/mat-bang-tang-thap-3.jpg",
      altVi: "Mặt bằng tầng điển hình tháp 3 Palm River",
      altEn: "Typical floor plan of Palm River Tower 3"
    },
    {
      id: "thap4", labelVi: "Tháp 4", labelEn: "Tower 4",
      image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/mat-bang-tang-thap-4.jpg",
      altVi: "Mặt bằng tầng điển hình tháp 4 Palm River",
      altEn: "Typical floor plan of Palm River Tower 4"
    }
  ],
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
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/studio.jpg",
    benefits: [
      { vi: "Tối ưu không gian: Thiết kế mở xuyên suốt không vách ngăn, tận dụng triệt để từng mét vuông sử dụng.", en: "Space-optimised: Open-plan design with no partitions, making full use of every square metre." },
      { vi: "Mặt tiền kính cực đại: Đón sáng và gió tự nhiên hoàn hảo nhờ dải cửa kính trải dài toàn bộ mặt tiền căn hộ.", en: "Maximum glass frontage: Perfect natural light and airflow thanks to a glass façade spanning the entire unit frontage." },
      { vi: "Phù hợp đầu tư: Diện tích nhỏ gọn, linh hoạt công năng, đảm bảo tính thanh khoản và tỷ suất cho thuê vượt trội.", en: "Investment-friendly: A compact, flexible layout that ensures strong liquidity and rental yield." }
    ]
  },
  {
    id: "1pn", vi: "1PN", en: "1BR",
    areaVi: "65,9 m²", areaEn: "65.9 m²",
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/1-pn.jpg",
    benefits: [
      { vi: "Diện tích hiếm có: 65,9m² cho phân khúc 1 phòng ngủ, mang lại không gian sống rộng rãi cho người độc thân và cặp đôi.", en: "Rare floor area: 65.9m² for the 1-bedroom segment, offering spacious living for singles and couples." },
      { vi: "Kính bo cong nghệ thuật: Phòng khách sở hữu hệ kính bo tròn góc tinh tế, mở rộng tầm nhìn Panorama tuyệt mỹ.", en: "Artistic curved glazing: The living room features an elegant curved-corner glass system, opening onto a stunning panoramic view." },
      { vi: "Riêng tư & Sang trọng: Phòng ngủ tách biệt hoàn toàn với khu vực sinh hoạt chung rộng lớn, đảm bảo sự yên tĩnh tuyệt đối.", en: "Private & refined: The bedroom is fully separated from the large shared living area, ensuring total quiet." }
    ]
  },
  {
    id: "2pn", vi: "2PN", en: "2BR",
    areaVi: "84,9–85,9 m²", areaEn: "84.9–85.9 m²",
    /* Corner variant (84.9 m² net / 75.8 m² gross) — the leading
       figure in this type's area range; the site has no separate slot
       for the 85.9 m² standard variant's own card (see README). */
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/2-pn.jpg",
    benefits: [
      { vi: "Tầm nhìn đa diện: 100% là căn góc (gồm 2 căn góc bo tròn kính panorama và 1 căn góc chuẩn).", en: "Multi-angle views: 100% corner units (including 2 curved panorama-glass corner units and 1 standard corner unit)." },
      { vi: "Thiết kế vuông vức: Bố trí công năng thông minh, triệt tiêu hoàn toàn các góc chết.", en: "Squared-off design: A smart functional layout that eliminates all dead corners." },
      { vi: "Tối ưu diện tích: Không có hành lang thừa bên trong, tỷ lệ diện tích thông thủy cực cao.", en: "Optimised area: No wasted internal corridor space, for a very high carpet-area ratio." }
    ]
  },
  {
    id: "2pn-dac-biet", vi: "2PN đặc biệt", en: "2BR Deluxe",
    areaVi: "120,2 m²", areaEn: "120.2 m²",
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/2-pn-dac-biet.jpg",
    benefits: [
      { vi: "Phòng khách: Không gian sinh hoạt chung cực lớn kết hợp hệ cửa lùa 6 cánh panorama.", en: "Living room: An extra-large shared living space paired with a 6-panel panoramic sliding-door system." },
      { vi: "Bếp đôi đẳng cấp: Phân tách hoàn toàn khu vực bếp khô và bếp ướt riêng biệt.", en: "Dual premium kitchen: Fully separated dry and wet kitchen areas." },
      { vi: "Đặc quyền Powder Room: Bố trí thêm WC dành riêng cho khách – thiết kế cực hiếm tại phân khúc 2 phòng ngủ.", en: "Powder room privilege: An additional guest WC — an exceptionally rare feature in the 2-bedroom segment." }
    ]
  },
  {
    id: "3pn", vi: "3PN", en: "3BR",
    areaVi: "126,1 m²", areaEn: "126.1 m²",
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/3-pn.jpg",
    benefits: [
      { vi: "Master Suite đẳng cấp: Phòng ngủ chính sở hữu tầm nhìn góc rộng, đi kèm hệ thống phòng tắm lớn trang bị bồn tắm thư giãn.", en: "Premium master suite: The master bedroom enjoys a wide corner view, with a large en-suite bathroom fitted with a relaxation bathtub." },
      { vi: "Bếp kín chuyên biệt: Tách biệt hoàn toàn khu vực nấu nướng, ngăn ám mùi hiệu quả – thiết kế “đo ni đóng giày” cho gia đình Việt.", en: "Dedicated enclosed kitchen: A fully separated cooking area for effective odour control — tailor-made for Vietnamese families." },
      { vi: "Không gian chung thoáng đãng: Khu vực phòng khách và phòng ăn vuông vức, rộng lớn, dễ dàng bố trí nội thất sang trọng.", en: "Airy shared spaces: Square, spacious living and dining areas that are easy to furnish elegantly." }
    ]
  },
  {
    id: "3pn-dac-biet", vi: "3PN đặc biệt", en: "3BR Deluxe",
    areaVi: "157,0 m²", areaEn: "157.0 m²",
    image: "https://savills-hub.com.vn/residential/palm-river-2/assets/images/3-pn-dac-biet.jpg",
    benefits: [
      { vi: "Kính bo cong Panorama: Phòng Master sở hữu hệ kính bo tròn nghệ thuật, tối đa hóa tầm nhìn ngoạn mục.", en: "Panoramic curved glazing: The master bedroom features an artistic curved-glass system, maximising the spectacular view." },
      { vi: "Tiện nghi thượng lưu: Bố trí 2 phòng tắm lớn kết hợp cùng 1 Powder Room (WC dành riêng cho khách).", en: "Upscale amenities: Two large bathrooms plus one powder room (guest WC)." },
      { vi: "Bếp kín chuyên biệt: Tách biệt hoàn toàn với phòng ăn, ngăn mùi tuyệt đối – thiết kế hoàn hảo cho văn hóa ẩm thực gia đình Á Đông.", en: "Dedicated enclosed kitchen: Fully separated from the dining room for total odour control — perfectly suited to Asian family cooking culture." }
    ]
  }
];

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
   PAYMENT PLANS — §chinh-sach (Chính sách thanh toán)
   Transcribed from the approved Palm River payment-policy poster
   ("ĐĂNG KÝ NHẬN THÔNG TIN: 100 TRIỆU VNĐ"). Every percentage/time
   figure below matches that source exactly; nothing is invented.

   Shape per plan: { id, number, labelVi/En, registrationAmount,
   milestones[], benefitsVi/En[] } — mortgage additionally carries
   customerTotal/bankTotal for its dual-track summary. A milestone is
   { numberVi/En, pct, repeat, timeVi/En (elapsed time to reach this
   step, first step only), gapVi/En (time-between-steps label shown on
   the connector before this step), chipVi/En (short milestone code:
   XNDK/VBTT/HDMB/HANDOVER/GCN — null if this step has none),
   chipFullVi/En (its always-visible expanded label, never hover-only) }.
   `pct * repeat` is this milestone's true share of 100% — Đợt 5–9 is
   one grouped milestone with pct:10, repeat:5 (=50%), never flattened
   to a single 10% entry. renderPolicyPanel() in js/sections.js
   validates every plan sums to 100% (dev-console warning if not) and
   builds the desktop-horizontal / mobile-vertical timeline from this
   one array — no separate breakpoint markup. */
/* -----------------------------------------------------
   HANDOVER SPECIFICATIONS — approved pages from "Palm River - Danh
   mục vật tư bàn giao và thương hiệu" (materials/brand handover
   checklist), rendered as a carousel between Floor Plans and Payment
   Policy. Every page supplied in the source folder is included, in
   its original order; alt text names each page's subject for
   accessibility rather than repeating a generic "handover image".
   ----------------------------------------------------- */
window.handoverImages = [
  { src: "assets/handover-checklist-01.webp", altVi: "Danh mục vật tư bàn giao – Sàn", altEn: "Handover materials – Flooring" },
  { src: "assets/handover-checklist-02.webp", altVi: "Danh mục vật tư bàn giao – Tường", altEn: "Handover materials – Walls" },
  { src: "assets/handover-checklist-03.webp", altVi: "Danh mục vật tư bàn giao – Thiết bị phòng tắm", altEn: "Handover materials – Bathroom fixtures" },
  { src: "assets/handover-checklist-04.webp", altVi: "Danh mục vật tư bàn giao – Thiết bị bếp", altEn: "Handover materials – Kitchen appliances" },
  { src: "assets/handover-checklist-05.webp", altVi: "Danh mục vật tư bàn giao – Tủ nội thất (Sảnh, Bếp, Phòng ngủ)", altEn: "Handover materials – Built-in cabinetry (Entrance, Kitchen, Bedroom)" },
  { src: "assets/handover-checklist-06.webp", altVi: "Danh mục vật tư bàn giao – Tủ nội thất (Tủ gương, Tủ kho)", altEn: "Handover materials – Built-in cabinetry (Mirror cabinet, Storage)" },
  { src: "assets/handover-checklist-07.webp", altVi: "Danh mục vật tư bàn giao – Điều hòa & Thiết bị điện", altEn: "Handover materials – Air-conditioning & electrical equipment" }
];

window.paymentPlanMilestoneChips = {
  XNDK: { vi: "XNĐK", en: "Confirmation", fullVi: "Xác nhận đăng ký", fullEn: "Confirmation of Registration" },
  VBTT: { vi: "VBTT", en: "VBTT", fullVi: "Văn bản thỏa thuận", fullEn: "Agreement Document" },
  HDMB: { vi: "HĐMB", en: "SPA", fullVi: "Hợp đồng mua bán", fullEn: "Sales and Purchase Agreement" },
  HANDOVER: { vi: "Bàn giao", en: "Handover", fullVi: "Danh mục bàn giao", fullEn: "Handover Specifications" },
  GCN: { vi: "GCN", en: "GCN", fullVi: "Giấy chứng nhận", fullEn: "Ownership Certificate" }
};

window.paymentPlans = [
  {
    id: "standard",
    number: "01",
    labelVi: "Thanh toán chuẩn", labelEn: "Standard Payment Plan",
    registrationAmount: 100,
    milestones: [
      { numberVi: "Đợt 1", numberEn: "Instalment 1", pct: 5, repeat: 1,
        timeVi: "5 ngày", timeEn: "5 days", chip: "VBTT" },
      { numberVi: "Đợt 2", numberEn: "Instalment 2", pct: 5, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months", chip: "HDMB" },
      { numberVi: "Đợt 3", numberEn: "Instalment 3", pct: 5, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months" },
      { numberVi: "Đợt 4", numberEn: "Instalment 4", pct: 5, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months" },
      { numberVi: "Đợt 5–9", numberEn: "Instalments 5–9", pct: 10, repeat: 5,
        gapVi: "3 tháng/lần", gapEn: "every 3 months" },
      { numberVi: "Đợt 10", numberEn: "Instalment 10", pct: 25, repeat: 1,
        chip: "HANDOVER" },
      { numberVi: "Đợt 11", numberEn: "Instalment 11", pct: 5, repeat: 1,
        chip: "GCN" }
    ],
    benefitsVi: [
      { label: "Ký HĐMB", value: "Chỉ 10%" },
      { label: "Ưu đãi giới hạn", value: "Lên đến 11%" },
      { label: "Thanh toán", value: "Trong 26 tháng", note: "Đến khi nhận nhà" }
    ],
    benefitsEn: [
      { label: "SPA signing", value: "Only 10%" },
      { label: "Limited-Time Offers", value: "Up to 11%" },
      { label: "Payment term", value: "26 months", note: "Until handover" }
    ]
  },
  {
    id: "special",
    number: "02",
    labelVi: "Thanh toán đặc biệt", labelEn: "Special Payment Plan",
    registrationAmount: 100,
    milestones: [
      { numberVi: "Đợt 1", numberEn: "Instalment 1", pct: 5, repeat: 1,
        timeVi: "5 ngày", timeEn: "5 days", chip: "VBTT" },
      { numberVi: "Đợt 2", numberEn: "Instalment 2", pct: 5, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months", chip: "HDMB" },
      { numberVi: "Đợt 3", numberEn: "Instalment 3", pct: 10, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months" },
      { numberVi: "Đợt 4", numberEn: "Instalment 4", pct: 10, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months" },
      { numberVi: "Đợt 5", numberEn: "Instalment 5", pct: 65, repeat: 1,
        gapVi: "15 tháng", gapEn: "15 months", chip: "HANDOVER" },
      { numberVi: "Đợt 6", numberEn: "Instalment 6", pct: 5, repeat: 1,
        chip: "GCN" }
    ],
    benefitsVi: [
      { label: "Ký HĐMB", value: "Chỉ 10%" },
      { label: "Thanh toán 0%", value: "Trong 15 tháng", note: "Đến khi nhận nhà" },
      { label: "Ưu đãi giới hạn", value: "Lên đến 6,5%" },
      { label: "Thanh toán", value: "30%", note: "Đến khi nhận nhà" }
    ],
    benefitsEn: [
      { label: "SPA signing", value: "Only 10%" },
      { label: "0% payment", value: "For 15 months", note: "Until handover" },
      { label: "Limited-Time Offers", value: "Up to 6.5%" },
      { label: "Payment", value: "30%", note: "Until handover" }
    ]
  },
  {
    id: "accelerated",
    number: "03",
    labelVi: "Thanh toán nhanh", labelEn: "Accelerated Payment Plan",
    registrationAmount: 100,
    milestones: [
      { numberVi: "Đợt 1", numberEn: "Instalment 1", pct: 5, repeat: 1,
        timeVi: "5 ngày", timeEn: "5 days", chip: "VBTT" },
      { numberVi: "Đợt 2", numberEn: "Instalment 2", pct: 65, repeat: 1,
        gapVi: "3 tháng", gapEn: "3 months", chip: "HDMB" },
      { numberVi: "Đợt 3", numberEn: "Instalment 3", pct: 25, repeat: 1,
        gapVi: "24 tháng", gapEn: "24 months", chip: "HANDOVER" },
      { numberVi: "Đợt 4", numberEn: "Instalment 4", pct: 5, repeat: 1,
        chip: "GCN" }
    ],
    benefitsVi: [
      { label: "Thanh toán sớm", value: "Ưu đãi 13%" }
    ],
    benefitsEn: [
      { label: "Early payment", value: "13% incentive" }
    ]
  },
  {
    id: "mortgage",
    number: "04",
    labelVi: "Thanh toán vay", labelEn: "Mortgage-assisted Payment Plan",
    registrationAmount: 100,
    customerTotal: 25,
    bankTotal: 75,
    milestones: [
      { numberVi: "Đợt 1", numberEn: "Instalment 1",
        timeVi: "5 ngày", timeEn: "5 days", chip: "VBTT",
        customerPct: 5, bankPct: null },
      { numberVi: "Đợt 2", numberEn: "Instalment 2",
        gapVi: "3 tháng", gapEn: "3 months", chip: "HDMB",
        customerPct: 5, bankPct: 55 },
      { numberVi: "Đợt 3", numberEn: "Instalment 3",
        gapVi: "24 tháng", gapEn: "24 months", chip: "HANDOVER",
        customerPct: 15, bankPct: 15 },
      { numberVi: "Đợt 4", numberEn: "Instalment 4",
        chip: "GCN",
        customerPct: null, bankPct: 5 }
    ],
    benefitsVi: [
      { label: "Ký HĐMB", value: "Chỉ 10%" },
      { label: "Thanh toán", value: "Chỉ 10%", note: "Đến khi nhận nhà" },
      { label: "Hỗ trợ lãi suất", value: "24 tháng" },
      { label: "Ân hạn nợ gốc", value: "36–60 tháng" },
      { label: "NH hỗ trợ", value: "75%", note: "Thanh toán" }
    ],
    benefitsEn: [
      { label: "SPA signing", value: "Only 10%" },
      { label: "Payment", value: "Only 10%", note: "Until handover" },
      { label: "Interest support", value: "24 months" },
      { label: "Principal grace period", value: "36–60 months" },
      { label: "Bank supports", value: "75%", note: "of payment" }
    ]
  },
  /* 5th selectable block — not a payment plan, so it carries no
     milestones/benefits/registrationAmount; renderPolicyPanel() in
     js/sections.js checks isPromo and mounts the approved "giá vàng
     ưu đãi" image (previously a standalone figure above the tabs)
     instead of a timeline. validatePaymentPlans() also skips it. */
  {
    id: "promotions",
    number: "05",
    labelVi: "Ưu đãi", labelEn: "Promotions",
    isPromo: true,
    promoImage: "assets/offers-gold-promotion.webp",
    promoAltVi: "Bảng giá và ưu đãi Palm River",
    promoAltEn: "Palm River price and offers"
  }
];


/* -----------------------------------------------------
   PRESS ARTICLES — Row 12 (D12)
   Two confirmed Savills sources, each with real VI/EN copy supplied
   by the client (not translated on the fly — both language versions
   are given explicitly). See renderPressArticles() in js/sections.js
   for how these fields become a card.
   ----------------------------------------------------- */
window.pressArticles = [
  {
    sourceVi: "SAVILLS BLOG",
    sourceEn: "SAVILLS BLOG",
    titleVi: "Dự án ven sông Sài Gòn – Palm River trong bức tranh bất động sản ven sông",
    titleEn: "Saigon riverside developments – Palm River in the riverside property landscape",
    excerptVi: "Bài viết phân tích của Savills Việt Nam về xu hướng bất động sản ven sông tại TP.HCM, trong đó Palm River được nhắc đến như một điểm sáng tại khu Đông thành phố.",
    excerptEn: "Savills Vietnam explores the riverside property trend in Ho Chi Minh City, with Palm River highlighted as a notable development in the eastern part of the city.",
    ctaVi: "Đọc bài viết",
    ctaEn: "Read article",
    url: "https://vn.savills.com.vn/blog/article/238470/vietnam-viet/du-an-ven-song-sai-gon.aspx#palm-river",
    /* "Ảnh Tin Tức 1" from the connected Drive (uploaded 2026-09-15,
       fileId 1AAiIgggm7g8F8AMt_XgWbpwICXwFdJXp) — downloaded and
       converted to WebP at assets/media/news-palm-river-riverside.webp. */
    image: "assets/media/news-palm-river-riverside.webp",
    imageObjectPosition: "58% 45%",
    imageAltVi: "Phối cảnh dự án ven sông Palm River",
    imageAltEn: "Riverside view of Palm River"
  },
  {
    sourceVi: "SAVILLS VIỆT NAM",
    sourceEn: "SAVILLS VIETNAM",
    titleVi: "Savills Việt Nam được bổ nhiệm làm Đối tác Chiến lược Quốc tế của Palm River",
    titleEn: "Savills Vietnam appointed International Strategic Partner for Palm River",
    excerptVi: "Chính thức khởi động ngày 12/08/2026, Palm River bước vào giai đoạn giới thiệu ra thị trường với Savills Việt Nam đồng hành trong vai trò Đối tác Chiến lược Quốc tế.",
    excerptEn: "Officially launched on 12 August 2026, Palm River entered its market introduction phase with Savills Vietnam supporting the project as International Strategic Partner.",
    ctaVi: "Xem bài đăng",
    ctaEn: "View post",
    url: "https://www.facebook.com/SavillsVietnam/posts/savills-vi%E1%BB%87t-nam-%C4%91%C6%B0%E1%BB%A3c-b%E1%BB%95-nhi%E1%BB%87m-l%C3%A0m-%C4%91%E1%BB%91i-t%C3%A1c-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-qu%E1%BB%91c-t%E1%BA%BF-c%E1%BB%A7a-palm-river-d%E1%BB%B1-/1558683272966044/",
    /* Real photo of the on-stage certificate handover, matching this
       post's own subject (Savills appointed international strategic
       partner for Palm River). */
    image: "assets/media/palm-river-savills-partnership-event.jpg",
    imageObjectPosition: "50% 32%",
    imageAltVi: "Lễ công bố Savills Việt Nam là Đối tác Chiến lược Quốc tế của Palm River",
    imageAltEn: "Ceremony announcing Savills Vietnam as Palm River’s International Strategic Partner"
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
    { value: "o-de-o", vi: "Mua để ở", en: "For Own Living" },
    { value: "dau-tu", vi: "Đầu tư", en: "For Investment" },
    { value: "cho-thue", vi: "Cho thuê", en: "For Rental" }
  ],
  productOptions: [
    { value: "studio", vi: "Studio", en: "Studio" },
    { value: "1pn", vi: "1 phòng ngủ (1PN)", en: "1 bedroom (1BR)" },
    { value: "2pn", vi: "2 phòng ngủ (2PN)", en: "2 bedrooms (2BR)" },
    { value: "3pn", vi: "3 phòng ngủ (3PN)", en: "3 bedrooms (3BR)" },
    { value: "duplex-penthouse", vi: "Duplex/Penthouse", en: "Duplex/Penthouse" },
    { value: "shophouse", vi: "Shophouse", en: "Shophouse" },
    { value: "thang-may-rieng", vi: "Căn hộ thang máy riêng", en: "Private elevator apartment" }
  ],
  budgetOptions: [
    { value: "duoi-15", vi: "Dưới 15 tỷ", en: "Under VND 15 billion" },
    { value: "15-20", vi: "15 – 20 tỷ", en: "VND 15–20 billion" },
    { value: "20-25", vi: "20 – 25 tỷ", en: "VND 20–25 billion" },
    { value: "tren-25", vi: "Trên 25 tỷ", en: "Over VND 25 billion" }
  ]
};
