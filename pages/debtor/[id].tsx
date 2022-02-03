import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DebtorCard from "../../component/debtorCard";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function DebtorMainPage() {
  const router = useRouter();
  const pathData = router.query;
  var debtorId = pathData.id;
  const [statement, setStatement] = useState({
    ownerName: String,
    debtor: String,
    outstandingBalance: Number,
    lastPayment: Date,
    status: String,
  });
  const loadStatement = () => {
    if (debtorId != null) {
      try {
        console.log(`${baseURL}/${debtorId}`);
        axios.get(`${baseURL}/${debtorId}`).then((response) => {
          setStatement(response.data);
          console.log(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    loadStatement();
  }, [debtorId]);
  return (
    <DebtorCard
      debtorId={debtorId}
      ownerName={statement.ownerName}
      debtor={statement.debtor}
      outstandingBalance={statement.outstandingBalance}
      lastPayment={statement.lastPayment}
      status={statement.status}
      loadStatement={loadStatement}
    />
  );
}
