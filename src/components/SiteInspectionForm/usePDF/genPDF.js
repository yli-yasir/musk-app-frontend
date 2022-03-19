import { getSectionsCellData } from "./transformInput";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// sections is an array where each item is has a title property and a subsections property
// subSections is an array of strings
export default function genPDF(sections, inputData) {
  const doc = new jsPDF();
  const sectionsCellData = getSectionsCellData(sections, inputData);

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
    body: makeTableBody(sectionsCellData),
  });

  return doc;
}

function makeTableBody(sectionsCellData) {
  const rows = [];
  let curRow = 1;
  const pushSection = attemptCellPush();
  const pushSubSection = attemptCellPush();
  const pushInspectionAct = attemptCellPush();

  for (const section of sectionsCellData) {
    for (const subSection of section.subSections) {
      for (const inspectionAct of subSection.inspectionActs) {
        for (const image of inspectionAct.images) {
          const row = [];
          // Should we push a section cell in this row?
          // Below functions will decide.
          pushSection(section, curRow, row);
          // Should we push a subsection cell in this row?
          pushSubSection(subSection, curRow, row);
          // Should we push an inspection act and associated cells in this row?
          const inspectionActPushed = pushInspectionAct(
            inspectionAct,
            curRow,
            row
          );
          inspectionActPushed &&
            pushInspectionActRelatedCells(inspectionAct, row);

          // Always push an image cell.
          row.push({ content: image.content });
          // Finally push the row.
          rows.push(row);
          curRow++;
        }
      }
    }
  }

  return rows;
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
