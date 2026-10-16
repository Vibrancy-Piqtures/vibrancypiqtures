import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getAllPackages } from "@/lib/data/packages";

const categoryLabels: Record<string, string> = {
  proposal: "Proposal Packages",
  kukyaala: "Kukyaala Packages",
  kuhingira: "Kwanjula & Kuhingira Packages",
  wedding: "Wedding Packages",
  "portrait-indoor": "Portrait Session – Indoor (Studio)",
  "portrait-outdoor": "Portrait Session – Outdoor",
  corporate: "Corporate Photoshoot",
  creative: "Creative Photoshoot",
};

const categoryOrder = [
  "proposal",
  "kukyaala",
  "kuhingira",
  "wedding",
  "portrait-indoor",
  "portrait-outdoor",
  "corporate",
  "creative",
];

const extraServices = [
  { label: '(2) 4K 50" Display TVs', price: "USH 750,000" },
  { label: "Extra A3 Photobook", price: "FROM USH 480,000" },
  { label: "Drone Services (Full Day)", price: "USH 500,000" },
  { label: "Extra A4 Photobook", price: "FROM USH 350,000" },
  { label: "360 Photo Booth | Full Day", price: "+ USH 800,000" },
  { label: "Love Story (Shot from Our Office)", price: "Free Of Charge" },
  { label: "Extra Photographer", price: "+ USH 600,000" },
  { label: "Same Day Edit", price: "+ USH 600,000" },
  { label: "360 camera", price: "+ USH 800,000" },
];

const LOGO_PATH = "/assets/Logo/Vibrancy-Logo.png";

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function getImageDimensions(dataUrl: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ w: 1, h: 1 });
    img.src = dataUrl;
  });
}

function fitImage(natural: { w: number; h: number }, boxW: number, boxH: number) {
  const ratio = Math.min(boxW / natural.w, boxH / natural.h);
  return { w: natural.w * ratio, h: natural.h * ratio };
}

type Pkg = ReturnType<typeof getAllPackages>[number];

export async function generatePackagesPdf(category: string = "all") {
  const PAGE_W = 360;
  const PAGE_H = 640;

  const doc = new jsPDF({
    unit: "pt",
    format: [PAGE_W, PAGE_H],
    orientation: "portrait",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const contentW = pageWidth - marginX * 2;

  const IMG_BOX_W = contentW;
  const IMG_BOX_H = 160;
  const CARD_PADDING = 12;
  const CARD_GAP = 14;
  const CAT_HEADER_H = 30;
  const CAT_HEADER_GAP = 14;
  const BOTTOM_MARGIN = 40;

  const isAll = category === "all";
  const headerTitle = isAll
    ? "Our Packages"
    : categoryLabels[category] || "Our Packages";

  // HEADER

  let cursorY = BOTTOM_MARGIN;

  if (isAll) {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, 100, "F");
    doc.setDrawColor(225);
    doc.setLineWidth(0.5);
    doc.line(0, 100, pageWidth, 100);

    const logoData = await loadImageAsDataUrl(LOGO_PATH);
    let titleY = 40;
    if (logoData) {
      const dims = await getImageDimensions(logoData);
      const logoBox = fitImage(dims, 110, 44);
      doc.addImage(
        logoData,
        "PNG",
        pageWidth / 2 - logoBox.w / 2,
        10,
        logoBox.w,
        logoBox.h
      );
      titleY = 74;
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(20);
    const titleLines = doc.splitTextToSize(headerTitle, contentW);
    doc.text(titleLines, pageWidth / 2, titleY, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(
      "Choose the perfect plan for your next event.",
      pageWidth / 2,
      titleY + 16,
      { align: "center" }
    );

    cursorY = 120;
  }

  const allPackages = getAllPackages();
  const grouped = allPackages.reduce<Record<string, Pkg[]>>((acc, pkg) => {
    const cat = pkg.category || "uncategorised";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(pkg);
    return acc;
  }, {});

  const categoriesToRender = isAll
    ? categoryOrder
    : categoryOrder.filter((c) => c === category);

  const newPage = () => {
    doc.addPage([PAGE_W, PAGE_H], "portrait");
    cursorY = BOTTOM_MARGIN;
  };

  const ensureSpace = (needed: number) => {
    if (cursorY + needed > pageHeight - BOTTOM_MARGIN) {
      newPage();
    }
  };

  const measureCard = (
    pkg: Pkg
  ): {
    cardH: number;
    nameLines: string[];
    descLines: string[];
    featureLines: string[][];
    nameH: number;
    descH: number;
  } => {
    const innerW = contentW - CARD_PADDING * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    const nameLines = doc.splitTextToSize(pkg.name, innerW);

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const descLines = doc.splitTextToSize(pkg.description, innerW);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const featureLines = pkg.features.map((f: string) =>
      doc.splitTextToSize(f, innerW - 14)
    );

    const nameH = nameLines.length * 16;
    const descH = descLines.length * 13;
    const featuresH = featureLines.reduce(
      (sum: number, lines: string[]) => sum + lines.length * 13 + 2,
      0
    );
    const priceH = 18;

    const cardH =
      CARD_PADDING +
      IMG_BOX_H +
      12 +
      nameH +
      6 +
      priceH +
      8 +
      descH +
      10 +
      featuresH +
      CARD_PADDING;

    return { cardH, nameLines, descLines, featureLines, nameH, descH };
  };

  const drawCategoryHeader = (label: string) => {
    doc.setFillColor(230, 230, 230);
    doc.rect(marginX, cursorY, contentW, CAT_HEADER_H, "F");
    doc.setFillColor(17, 71, 71);
    doc.rect(marginX, cursorY, 5, CAT_HEADER_H, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20);
    const catLines = doc.splitTextToSize(label, contentW - 20);
    doc.text(catLines, marginX + 14, cursorY + 20);
    cursorY += CAT_HEADER_H + CAT_HEADER_GAP;
  };

  const drawCard = async (pkg: Pkg) => {
    const m = measureCard(pkg);
    ensureSpace(m.cardH + CARD_GAP);

    const cardTop = cursorY;

    doc.setFillColor(250, 250, 250);
    doc.rect(marginX, cardTop, contentW, m.cardH, "F");
    doc.setDrawColor(225);
    doc.rect(marginX, cardTop, contentW, m.cardH);

    let y = cardTop + CARD_PADDING;

    const imgData = pkg.image ? await loadImageAsDataUrl(pkg.image) : null;
    if (imgData) {
      const dims = await getImageDimensions(imgData);
      const fitted = fitImage(dims, IMG_BOX_W, IMG_BOX_H);
      const imgX = marginX + (contentW - fitted.w) / 2;
      const imgY = y + (IMG_BOX_H - fitted.h) / 2;
      doc.addImage(imgData, "JPEG", imgX, imgY, fitted.w, fitted.h);
    }
    y += IMG_BOX_H + 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(20);
    doc.text(m.nameLines, marginX + CARD_PADDING, y + 12);
    y += m.nameH + 6;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(17, 71, 71);
    doc.text(
      `USH ${pkg.price.toLocaleString()}`,
      marginX + CARD_PADDING,
      y + 12
    );
    y += 18 + 8;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(110);
    doc.text(m.descLines, marginX + CARD_PADDING, y + 10);
    y += m.descH + 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    for (let i = 0; i < pkg.features.length; i++) {
      doc.setTextColor(17, 71, 71);
      doc.text("•", marginX + CARD_PADDING, y + 10);
      doc.setTextColor(60);
      doc.text(m.featureLines[i], marginX + CARD_PADDING + 12, y + 10);
      y += m.featureLines[i].length * 13 + 2;
    }

    cursorY = cardTop + m.cardH + CARD_GAP;
  };

  let isFirstCategory = true;

  for (const cat of categoriesToRender) {
    const packages = grouped[cat];
    if (!packages || packages.length === 0) continue;

    const label = categoryLabels[cat] || cat;

    const firstCardH = measureCard(packages[0]).cardH;
    const headerBlockH = CAT_HEADER_H + CAT_HEADER_GAP + firstCardH;

    if (isAll && !isFirstCategory) {
      // Every category in "all" mode starts on a fresh page.
      newPage();
    } else {
      // First category, or single-category: only move to a new page if the
      // header + first card can't fit at all (very rare with 640pt pages).
      ensureSpace(headerBlockH);
    }
    isFirstCategory = false;

    drawCategoryHeader(label);

    for (const pkg of packages) {
      await drawCard(pkg);
    }

    cursorY += 6;
  }

  // EXTRA SERVICES (only in "all" mode)
  if (isAll) {
    newPage();

    doc.setFillColor(230, 230, 230);
    doc.rect(marginX, cursorY, contentW, 30, "F");
    doc.setFillColor(17, 71, 71);
    doc.rect(marginX, cursorY, 5, 30, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(20);
    doc.text("Extra Epic Services", marginX + 14, cursorY + 20);
    cursorY += 42;

    autoTable(doc, {
      startY: cursorY,
      margin: { left: marginX, right: marginX },
      theme: "grid",
      headStyles: {
        fillColor: [17, 71, 71],
        textColor: 255,
        fontSize: 11,
        fontStyle: "bold",
        halign: "left",
      },
      styles: {
        fontSize: 10,
        cellPadding: 7,
        lineColor: [225, 225, 225],
        valign: "middle",
      },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      head: [["Service", "Price"]],
      body: extraServices.map((s) => [s.label, s.price]),
      columnStyles: {
        0: { cellWidth: contentW * 0.62 },
        1: {
          cellWidth: contentW * 0.38,
          halign: "right",
          textColor: [17, 71, 71],
          fontStyle: "bold",
        },
      },
    });

    // @ts-ignore
    cursorY = (doc as any).lastAutoTable.finalY + 20;
    if (cursorY > pageHeight - 60) {
      newPage();
    }

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(120);
    const note = doc.splitTextToSize(
      "Note: If we negotiate from the Silver Package and reduce the overall price, drone services are automatically calculated externally and billed separately.",
      contentW
    );
    doc.text(note, marginX, cursorY);
  }

  const slug = isAll
    ? "All"
    : (categoryLabels[category] || category)
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
  doc.save(`Vibrancy-Piqtures-Packages-${slug}.pdf`);
}
