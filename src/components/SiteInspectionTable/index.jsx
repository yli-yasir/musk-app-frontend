import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Link,
} from "@chakra-ui/react";

export default function InspectionTable({ data, ...props }) {
  return (
    <Table variant="simple" {...props}>
      <TableCaption>Site Inspections</TableCaption>
      <Thead>
        <Tr>
          <Th>Site</Th>
          <Th>Date</Th>
          <Th isNumeric>Interventions</Th>
          <Th isNumeric>Commendations</Th>
          <Th>Download</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((inspectionRecord) => (
          <Tr>
            <Td>{inspectionRecord.siteName}</Td>
            <Td>{inspectionRecord.date.toLocaleDateString()}</Td>
            <Td isNumeric>{inspectionRecord.interventionCount}</Td>
            <Td isNumeric>{inspectionRecord.commendationCount}</Td>
            <Td>
              <Link color="blue.400" href={inspectionRecord.download}>
                Download
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
