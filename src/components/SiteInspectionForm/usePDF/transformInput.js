import camelCase from "lodash.camelcase";
import startCase from "lodash.startcase";

export const BLANK_CELL_CONTENT = "-";
// Example args for getSectionsCellData()
//  const sections = [
//     { title: "work at top", subSections: ["work at top sub1", "work at topsub2"] },
//     { title: "work at bottom", subSections: ["work at buttom subsection"] },
//     { title: "hello world", subSections: ["saying hi", "saying hello"] }
//   ];

//    const inputData = {
//     workingStandards: {
//       workAtHeight: [{ images: [1, 2, 3] }, { images: [2] }],
//       workAtHeight2: [{ images: [3, 1] }],
//       workAtHeight3: []
//     },
//     misc: {
//       workAtMisc: []
//     },
//     helloWorld: {
//       imABaby: [
//         { images: [3, 2, 1], actType: "intervention" },
//         { images: [2, 1], actType: "commendation" }
//       ]
//     }
//   };

/**
 *  NEEDS BETTER DOCUMENTATION!
 * @param {Object[]} sections
 * @param {string} sections[].title The title of the section.
 * @param {string[]} sections[].subSections The titles of its subsections.
 *
 * @param {Object} inputData
 * An inputData key should be a camel cased section title.
 * An inputData values should be an object which represents a subsection.
 * A subsection key is a camel cased subsection title.
 * A subsection value is an array of inspection acts where each is an object.
 */
export function getSectionsCellData(sections, inputData) {
  return sections.map(
    ({ title: sectionTitle, subSections: subSectionTitles }) => ({
      content: sectionTitle,
      subSections: getSubSectionsCellData(
        sectionTitle,
        subSectionTitles,
        inputData
      ),
      rowSpan() {
        return this.subSections.reduce((a, b) => a + b.rowSpan(), 0);
      },
    })
  );
}

function getSubSectionsCellData(sectionTitle, subSectionTitles, inputData) {
  return subSectionTitles.map((subSectionTitle) => ({
    content: subSectionTitle,
    inspectionActs: getInspectionActsCellData(
      sectionTitle,
      subSectionTitle,
      inputData
    ),
    rowSpan() {
      return this.inspectionActs.reduce((a, b) => a + b.rowSpan(), 0);
    },
  }));
}

function getInspectionActsCellData(sectionTitle, subSectionTitle, inputData) {
  const sectionInputData = inputData[camelCase(sectionTitle)] || {};
  const subSectionInputData = sectionInputData[camelCase(subSectionTitle)];
  let inspectionActs =
    Array.isArray(subSectionInputData) && subSectionInputData.length > 0
      ? subSectionInputData
      : [{}];
  inspectionActs = inspectionActs.map((inspectionAct) => ({
    content: inspectionAct.actType
      ? startCase(inspectionAct.actType)
      : BLANK_CELL_CONTENT,
    description: inspectionAct.description || BLANK_CELL_CONTENT,
    isResolved:
      typeof inspectionAct.isResolved === "undefined"
        ? BLANK_CELL_CONTENT
        : inspectionAct.isResolved
        ? "Yes"
        : "No",
    resolution: inspectionAct.resolution || BLANK_CELL_CONTENT,
    images: getInspectionActImagesCellData(inspectionAct),
    rowSpan() {
      return this.images.length;
    },
  }));
  return inspectionActs;
}

function getInspectionActImagesCellData(inspectionAct = {}) {
  let { images } = inspectionAct;
  images =
    Array.isArray(images) && images.length > 0
      ? images
      : [[{ name: BLANK_CELL_CONTENT }]];
  return images.map(([file]) => ({ content: file.name, file }));
}
