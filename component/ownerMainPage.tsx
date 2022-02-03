import {
  Center,
  Flex,
  Heading,
  HStack,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ResultCard from "./resultCard";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
export default function OwnerMainPage() {
  const [pass, setPass] = useState("");
  const handleChange = (input: string) => {
    setPass(input);
  };
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    if (pass == "4913") {
      setAuth(true);
    } else if (pass.length >= 4) {
      setPass("");
    }
  }, [pass]);
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
  return auth ? (
    <>
      <Flex w="100vw" h="100vh" flexDir="column" p="5" overflow="auto">
        <Heading
          alignSelf="center"
          m="10"
          fontSize="7xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontWeight="extrabold"
        >
          MaStEr
        </Heading>
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
  ) : (
    <Flex w="100vw" h="100vh" flexDir="column" p="5" overflow="auto">
      <Heading
        alignSelf="center"
        m="10"
        fontSize="7xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontWeight="extrabold"
      >
        MaStEr
      </Heading>
      <Center mt="5">
        <HStack>
          <PinInput mask onChange={handleChange} value={pass}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      </Center>
    </Flex>
  );
}
