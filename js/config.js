/* =========================================================
   PALM CITY — SITE CONFIGURATION
   Prototype only. Central place for the project name, logo and
   data used by the sections below the Hero/Overview/USP block.

   IMPORTANT — BRAND RULE:
   The source "Section outline chuẩn" mixes references to "Palm City"
   and "Palm River". This prototype does not auto-rename the project —
   projectConfig.projectName/projectLogo below are the single source
   of truth for the currently approved brand, and every new section
   reads from this object instead of hard-coding the name. Two source
   URLs in the Savills news list (§10) contain a "palm-river" slug —
   those are kept verbatim because they are real external links, not
   because the project is being renamed.
   ========================================================= */
window.projectConfig = {
  projectName: "Palm City",
  projectLogo: "assets/palm-city-logo.png",
  language: "vi",
  hotline: "0969 696 201",
  hotlineHref: "tel:0969696201",
  /* Not yet confirmed — kept null so the floating buttons render
     disabled instead of pointing at an invented URL. */
  zaloUrl: null,
  whatsappUrl: null,

  /* -----------------------------------------------------
     IMAGE SLOTS — set the path here and it renders automatically, no
     layout/CSS changes needed. A slot left "" renders a neutral,
     correctly-proportioned placeholder frame (never a stock photo or
     "demo" label) instead.

     Only one approved rendering has been supplied so far
     (assets/palm-city-overview-riverside.jpg — the riverside towers
     shot with "Nơi tái tạo năng lượng mỗi ngày" and the Palm City
     logo embedded in it). It's used for both slots below: Overview
     shows it uncropped (object-fit: contain, so the embedded corner
     copy/logo stay intact); Project Details reuses the same file as
     an architectural overview shot (object-fit: cover, focal point
     lower-centre to keep the towers and riverside visible) since no
     second, dedicated rendering exists yet — reusing one confirmed
     image beats inventing a second one or leaving the frame empty.
     ----------------------------------------------------- */
  overviewImage: "assets/palm-city-overview-riverside.jpg",
  projectDetailImage: "assets/palm-city-overview-riverside.jpg"
};

/* -----------------------------------------------------
   PROJECT DETAILS — §4
   Only values already approved in the current prototype/spreadsheet
   are filled in. Fields with no confirmed source value use the
   shared "being updated" placeholder rather than invented copy.
   ----------------------------------------------------- */
window.projectDetails = [
  { vi: "Vị trí", en: "Location", valueVi: "Trái tim khu đô thị Nam Rạch Chiếc, TP. Thủ Đức, TP.HCM", valueEn: "Heart of Nam Rach Chiec urban area, Thu Duc City, Ho Chi Minh City", confirmed: true },
  { vi: "Chủ đầu tư phát triển", en: "Development investor", valueVi: null, valueEn: null, confirmed: false },
  { vi: "Đơn vị phân phối", en: "Distribution unit", valueVi: null, valueEn: null, confirmed: false },
  { vi: "Đối tác phân phối", en: "Distribution partner", valueVi: "Savills Việt Nam", valueEn: "Savills Vietnam", confirmed: true },
  { vi: "Mặt tiền sông", en: "River frontage", valueVi: "2,7km sông Giồng Ông Tố", valueEn: "2.7km along the Giong Ong To river", confirmed: true },
  { vi: "Mật độ xây dựng", en: "Building density", valueVi: "25%", valueEn: "25%", confirmed: true },
  { vi: "Quy mô căn hộ", en: "Number of units", valueVi: "Hơn 630 căn", valueEn: "630+ units", confirmed: true },
  { vi: "Loại hình sản phẩm", en: "Product types", valueVi: "Studio, 1PN, 2PN, 2PN đặc biệt, 3PN và 3PN đặc biệt", valueEn: "Studio, 1BR, 2BR, 2BR Deluxe, 3BR and 3BR Deluxe", confirmed: true },
  { vi: "Diện tích thông thủy", en: "Carpet area", valueVi: "41,3m² – 157m²", valueEn: "41.3m² – 157m²", confirmed: true },
  { vi: "Giá bán", en: "Indicative price", valueVi: "Từ 168 triệu/m²", valueEn: "From VND 168 million/m²", confirmed: true },
  { vi: "Booking giữ chỗ", en: "Booking amount", valueVi: "Từ 100 triệu VNĐ", valueEn: "From VND 100 million", confirmed: true },
  { vi: "Chiết khấu", en: "Discount", valueVi: "Đến 16,5%", valueEn: "Up to 16.5%", confirmed: true },
  { vi: "Tiện ích", en: "Amenities", valueVi: "100+ tiện ích Palm City và hệ tiện ích riêng của dự án", valueEn: "100+ Palm City amenities plus the project's own amenity system", confirmed: true },
  { vi: "Tiêu chuẩn bàn giao", en: "Handover standard", valueVi: "Nội thất hoàn thiện", valueEn: "Fully furnished", confirmed: true }
];

/* -----------------------------------------------------
   CONNECTIVITY / LOCATION — §5
   Grouped exactly as provided; travel times are approved source
   data, not estimates.
   ----------------------------------------------------- */
window.connectivityData = {
  "giao-thong": {
    vi: "Giao thông", en: "Transport",
    items: [
      { vi: "Ga Bình Trưng", en: "Binh Trung Station", time: "1 phút", timeEn: "1 min" },
      { vi: "Tuyến Metro Thủ Thiêm–Long Thành", en: "Thu Thiem–Long Thanh Metro Line", time: "3 phút", timeEn: "3 min" },
      { vi: "Nút giao An Phú", en: "An Phu Interchange", time: "3 phút", timeEn: "3 min" },
      { vi: "Cao tốc TP.HCM–Long Thành–Dầu Giây", en: "HCMC–Long Thanh–Dau Giay Expressway", time: "3 phút", timeEn: "3 min" },
      { vi: "Ga Metro Thủ Thiêm", en: "Thu Thiem Metro Station", time: "5 phút", timeEn: "5 min" },
      { vi: "Sân bay Quốc tế Long Thành", en: "Long Thanh International Airport", time: "30 phút", timeEn: "30 min" },
      { vi: "Cầu Cát Lái", en: "Cat Lai Bridge", time: "12 phút", timeEn: "12 min" },
      { vi: "Đường sắt cao tốc Bắc–Nam", en: "North–South High-Speed Railway", time: "3 phút", timeEn: "3 min" }
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
      { vi: "Khu trung tâm", en: "City centre", time: "12 phút", timeEn: "12 min" }
    ]
  },
  "benh-vien": {
    vi: "Bệnh viện", en: "Hospitals",
    items: [
      { vi: "Bệnh viện Quốc tế Palm", en: "Palm International Hospital", time: "1 phút", timeEn: "1 min" },
      { vi: "Bệnh viện Quốc tế Mỹ (AIH)", en: "American International Hospital (AIH)", time: "8 phút", timeEn: "8 min" }
    ]
  }
};

/* -----------------------------------------------------
   AMENITIES CAROUSEL — §6
   No approved photography exists in /assets for these slots yet.
   Each entry keeps its expected-asset path as a comment for the
   next content handoff; the carousel renders a neutral frame
   (never "demo"/lorem) until an image is supplied here.
   ----------------------------------------------------- */
/* Slot 1 uses the only approved lifestyle/riverside image supplied so
   far (the same Overview rendering — a genuine riverside/landscape
   shot, so it fits this category on its own merit, not just as a
   generic fallback). Slots 2-4 have no distinct amenity photo yet
   (pool/gym/clubhouse/park etc.) — duplicating the single available
   image across the rest of the carousel would look like a bug rather
   than real content, so they keep the neutral placeholder until
   dedicated photos are supplied. */
window.amenitiesSlides = [
  { image: "assets/palm-city-overview-riverside.jpg", objectPosition: "center 55%", expectedAsset: "assets/amenities/amenity-01.jpg", titleVi: "Cảnh quan ven sông", titleEn: "Riverside landscape" },
  { image: null, expectedAsset: "assets/amenities/amenity-02.jpg", titleVi: "Đang cập nhật", titleEn: "Being updated" },
  { image: null, expectedAsset: "assets/amenities/amenity-03.jpg", titleVi: "Đang cập nhật", titleEn: "Being updated" },
  { image: null, expectedAsset: "assets/amenities/amenity-04.jpg", titleVi: "Đang cập nhật", titleEn: "Being updated" }
];

/* -----------------------------------------------------
   FLOOR PLANS — §7
   Per-type imagery/areas are not yet approved; only the overall
   carpet-area range and unit-type list from §4 are confirmed. `image`
   stays "" (renders the neutral placeholder frame) until an approved
   plan/show-unit file is supplied per type.
   ----------------------------------------------------- */
window.floorPlanTypes = [
  { id: "studio", vi: "Studio", en: "Studio", image: "", expectedAsset: "assets/floor-plans/studio.jpg" },
  { id: "1pn", vi: "1PN", en: "1BR", image: "", expectedAsset: "assets/floor-plans/1pn.jpg" },
  { id: "2pn", vi: "2PN", en: "2BR", image: "", expectedAsset: "assets/floor-plans/2pn.jpg" },
  { id: "2pn-dac-biet", vi: "2PN đặc biệt", en: "2BR Deluxe", image: "", expectedAsset: "assets/floor-plans/2pn-dac-biet.jpg" },
  { id: "3pn", vi: "3PN", en: "3BR", image: "", expectedAsset: "assets/floor-plans/3pn.jpg" },
  { id: "3pn-dac-biet", vi: "3PN đặc biệt", en: "3BR Deluxe", image: "", expectedAsset: "assets/floor-plans/3pn-dac-biet.jpg" }
];

/* -----------------------------------------------------
   CONSTRUCTION PROGRESS — §9
   No approved milestones exist yet. Kept as an empty array on
   purpose — the section renders its "being updated" state rather
   than fabricated dates. Once real milestones are approved, each
   entry should follow this shape (image stays "" until supplied):
   { labelVi, labelEn, image: "", expectedAsset, descriptionVi, descriptionEn }
   ----------------------------------------------------- */
window.progressMilestones = [];

/* -----------------------------------------------------
   SAVILLS NEWS / CREDIBILITY CARDS — §10
   Real source links only. `publisher` is inferred from each URL's own
   domain/owner (both links point to Savills-owned channels), and
   `typeVi`/`typeEn` follow from that same fact — neither is invented.
   `confirmed` is false for both because no headline, publish date, or
   excerpt was supplied with these links: per this task's brief,
   unconfirmed cards are hidden rather than shown with placeholder
   copy. Flip `confirmed` to true and fill in date/title/excerpt once
   those are supplied, and the card renders automatically.
   ----------------------------------------------------- */
window.savillsNews = [
  {
    url: "https://vn.savills.com.vn/blog/article/238470/vietnam-viet/du-an-ven-song-sai-gon.aspx#palm-river",
    publisher: "Savills Việt Nam",
    typeVi: "Thông cáo chính thức", typeEn: "Official announcement",
    confirmed: false,
    dateVi: null, dateEn: null,
    titleVi: null, titleEn: null,
    excerptVi: null, excerptEn: null
  },
  {
    url: "https://www.facebook.com/SavillsVietnam/posts/savills-vi%E1%BB%87t-nam-%C4%91%C6%B0%E1%BB%A3c-b%E1%BB%95-nhi%E1%BB%87m-l%C3%A0m-%C4%91%E1%BB%91i-t%C3%A1c-chi%E1%BA%BFn-l%C6%B0%E1%BB%A3c-qu%E1%BB%91c-t%E1%BA%BF-c%E1%BB%A7a-palm-river-d%E1%BB%B1-/1558683272966044/",
    publisher: "Savills Việt Nam",
    typeVi: "Thông cáo chính thức", typeEn: "Official announcement",
    confirmed: false,
    dateVi: null, dateEn: null,
    titleVi: null, titleEn: null,
    excerptVi: null, excerptEn: null
  }
];
