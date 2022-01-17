import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ResultCard from "./resultCard";

const baseURL = "http://localhost:8000/statement";
export default function OwnerMainPage() {
  const [allStatements, setStatement] = useState([
    {
      id: Number,
      ownerName: String,
      debtor: String,
      outstandingBalance: Number,
      lastPayment: Date,
      status: String,
      submitTime: Date,
      payAmount: Number,
    },
  ]);
  const loadStatement = () => {
    try {
      console.log(`${baseURL}`);
      axios.get(`${baseURL}`).then((response) => {
        setStatement(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    loadStatement();
  }, []);
  return (
    <>
      <Flex
        bg="green.500"
        w="100vw"
        h="100vh"
        flexDir="column"
        p="5"
        overflow="auto"
      >
        {allStatements.map((statement) => (
          <ResultCard
            ownerName={statement.ownerName}
            debtor={statement.debtor}
            outstandingBalance={statement.outstandingBalance}
            lastPayment={statement.lastPayment}
            status={statement.status}
            submitTime={statement.submitTime}
            payAmount={statement.payAmount}
            debtorId={statement.id}
            loadStatement={loadStatement}
          />
        ))}
      </Flex>
    </>
  );
}
