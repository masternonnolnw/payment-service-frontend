import {
  Button,
  Divider,
  Flex,
  Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function ResultCard({
  ownerName,
  debtor,
  outstandingBalance,
  lastPayment,
  status,
  submitTime,
  debtorId,
  loadStatement,
  payAmount,
}: any): any {
  const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      console.log(`${baseURL}/${debtorId}`);
      var sum = parseInt(outstandingBalance) - parseInt(payAmount);
      axios
        .patch(`${baseURL}/${debtorId}`, {
          status: "Success",
          lastPayment: submitTime,
          outstandingBalance: sum,
        })
        .then((response) => {
          loadStatement();
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex
      bg="white"
      h="max"
      alignSelf="center"
      m="5"
      shadow="xl"
      border="1px"
      borderColor="blackAlpha.50"
      alignContent="center"
      w={isNotSmallerScreen ? "50vw" : "70vw"}
      // flexDir="column"
      flexDir="column"
    >
      <Flex flexDir="column" h="100%" p="5">
        <Spacer />
        <Text alignSelf="center" fontSize="2xl">
          {debtor}
        </Text>
        <Spacer />
      </Flex>
      <Flex flexDir="column" w="100%" p="5" pl="5" pt="0">
        {/* <Text m="1">Id: {debtorId}</Text> */}
        <Text m="1">Outstanding balance: {outstandingBalance}</Text>
        <Text m="1">
          Last payment: {moment(String(lastPayment)).format("DD/MM/YY hh:mm a")}
        </Text>
        <Text m="1">Status: {status}</Text>
        <Text m="1">
          submitTime: {moment(String(submitTime)).format("DD/MM/YY hh:mm a")}
        </Text>
        <Button
          w="max"
          p="5"
          m="1"
          mt="4"
          colorScheme="green"
          variant="outline"
          isDisabled={status != "pending"}
          onClick={handleSubmit}
          _focus={{
            outline: "none",
          }}
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );
}
