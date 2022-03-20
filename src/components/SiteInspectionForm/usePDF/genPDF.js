import { BLANK_CELL_CONTENT, getSectionsCellData } from "./transformInput";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoSrc from "../../../assets/logo.png";

// sections is an array where each item is has a title property and a subsections property
// subSections is an array of strings
export default function genPDF(sections, inputData) {
  const doc = new jsPDF();

  const logoFinalY = addLogo(doc);

  const sectionsCellData = getSectionsCellData(sections, inputData);
  const { rows, evidence } = makeTableBody(sectionsCellData);

  autoTable(doc, {
    theme: "grid",
    styles: {
      halign: "center",
      valign: "middle",
    },
    head: [
      [
        "Section",
        "Subsection",
        "Act",
        "Description",
        "Resolved",
        "Resolution",
        "Evidence",
      ],
    ],
    body: rows,
    startY: logoFinalY,
  });

  evidence.length > 0 && addEvidence(doc, evidence);

  return doc;
}

function makeTableBody(sectionsCellData) {
  const rows = [];
  const evidence = [];
  let curRow = 1;
  const pushSectionCell = attemptCellPush();
  const pushSubSectionCell = attemptCellPush();
  const pushInspectionActCell = attemptCellPush();
  const pushEvidence = evidenceCellPusher();

  for (const section of sectionsCellData) {
    for (const subSection of section.subSections) {
      for (const inspectionAct of subSection.inspectionActs) {
        for (const image of inspectionAct.images) {
          const row = [];
          // Should we push a section cell in this row?
          // Below functions will decide.
          pushSectionCell(section, curRow, row);
          // Should we push a subsection cell in this row?
          pushSubSectionCell(subSection, curRow, row);
          // Should we push an inspection act and associated cells in this row?
          pushInspectionActCell(inspectionAct, curRow, row) &&
            pushInspectionActRelatedCells(inspectionAct, row);

          // Always push an image cell.
          const evidenceData = pushEvidence(image, row);
          evidenceData && evidence.push(evidenceData);
          // Finally push the row.
          rows.push(row);
          curRow++;
        }
      }
    }
  }

  return { rows, evidence };
}

function evidenceCellPusher() {
  let count = 0;
  return (imageCellData, destinationRow) => {
    let cellContent = imageCellData.content;

    if (cellContent == BLANK_CELL_CONTENT) {
      destinationRow.push({ content: cellContent });
      return;
    }

    cellContent = `E#${count}`;
    destinationRow.push({ content: cellContent });
    count++;
    return { id: cellContent, file: imageCellData.file };
  };
}

function attemptCellPush() {
  let rowSpansCovered = 0;
  return (cellData, curRowCount, destinationRow) => {
    if (rowSpansCovered < curRowCount) {
      const rowSpan = cellData.rowSpan();
      destinationRow.push({
        content: cellData.content,
        rowSpan,
      });
      rowSpansCovered += rowSpan;
      return true;
    }
    return false;
  };
}

function pushInspectionActRelatedCells(inspectionActCellData, destinationRow) {
  const rowSpan = inspectionActCellData.rowSpan();

  destinationRow.push({
    content: inspectionActCellData.description,
    rowSpan,
  });

  destinationRow.push({
    content: inspectionActCellData.isResolved,
    rowSpan,
  });

  destinationRow.push({
    content: inspectionActCellData.resolution,
    rowSpan,
  });
}

function addEvidence(doc, evidence, y = 0) {
  let currentY = y;
  const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
  const MARGIN_TOP = 14;
  const MARGIN_BOTTOM = 14;
  const TITLE_HEIGHT = 5;
  const TITLE_MARGIN_BOTTOM = 5;
  const IMAGE_HEIGHT = 100;
  const IMAGE_WIDTH = 100;
  const MARGIN_LEFT = 14;
  const EVIDENCE_ITEM_HEIGHT =
    MARGIN_TOP +
    MARGIN_BOTTOM +
    TITLE_HEIGHT +
    TITLE_MARGIN_BOTTOM +
    IMAGE_HEIGHT;

  doc.addPage();
  currentY += MARGIN_TOP;
  doc.text(" - Evidence", MARGIN_LEFT, currentY);
  doc.setFont("courier", "italic");

  for (const { file, id } of evidence) {
    if (currentY + EVIDENCE_ITEM_HEIGHT > PAGE_HEIGHT) {
      doc.addPage();
      currentY = 0;
    }
    currentY += MARGIN_TOP;
    doc.text(id, MARGIN_LEFT + 10, currentY);
    currentY += TITLE_MARGIN_BOTTOM;

    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    doc.addImage(
      imageElement,
      "jpeg",
      MARGIN_LEFT + 20,
      currentY,
      IMAGE_WIDTH,
      IMAGE_HEIGHT
    );
    currentY += MARGIN_BOTTOM + IMAGE_HEIGHT;
    URL.revokeObjectURL(imageElement.src);
  }
}

function addLogo(doc) {
  const imageWidth = 50;
  const imageHeight = 25;
  const image = new Image();
  image.src = logoSrc;
  doc.addImage(
    image,
    "jpeg",
    doc.internal.pageSize.getWidth() / 2 - imageWidth / 2,
    5,
    50,
    imageHeight
  );
  return imageHeight + 15;
}
