import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function DebtorCard({
  debtorId,
  ownerName,
  debtor,
  outstandingBalance,
  lastPayment,
  status,
  loadStatement,
}: any) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleSubmitClose = (event: any) => {
    handleSubmit(event);
    close();
  };

  const [isNotSmallerScreen] = useMediaQuery("(min-width:800px)");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date + " " + time;
      axios
        .patch(`${baseURL}/${debtorId}`, {
          status: "pending",
          submitTime: dateTime,
          payAmount: outstandingBalance,
        })
        .then((response) => {
          loadStatement();
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancel = async (event: any) => {
    var statement: any = null;
    try {
      console.log(`${baseURL}/${debtorId}`);
      axios
        .get(`${baseURL}/${debtorId}`)
        .then((response) => {
          statement = response.data;
        })
        .then((response) => {
          loadStatement();
          if (statement.status == "pending") {
            event.preventDefault();
            try {
              axios
                .patch(`${baseURL}/${debtorId}`, {
                  status: "unpaid",
                })
                .then((response) => {
                  loadStatement();
                  console.log(response.data);
                });
            } catch (error) {
              console.error(error);
            }
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex
      w="100vw"
      h="100vh"
      bg="blackAlpha.100"
      flexDir="column"
      justifyContent="center"
    >
      <Flex
        w={isNotSmallerScreen ? "60vw" : "80vw"}
        h="max"
        bg="white"
        alignSelf="center"
        flexDir="column"
        p="5"
        shadow="xl"
      >
        <Text
          alignSelf="center"
          fontSize={isNotSmallerScreen ? "2xl" : "xl"}
          m="3"
        >
          {debtor}
        </Text>

        <Text fontSize={isNotSmallerScreen ? "xl" : "lg"} m="3">
          Owner: {ownerName}
        </Text>

        <Text fontSize={isNotSmallerScreen ? "xl" : "lg"} m="3">
          Amount: {outstandingBalance}
        </Text>

        <Text fontSize={isNotSmallerScreen ? "xl" : "lg"} m="3">
          Last payment: {moment(String(lastPayment)).format("DD/MM/YY hh:mm a")}
        </Text>

        <Text fontSize={isNotSmallerScreen ? "xl" : "lg"} m="3" mb="5">
          Status: {status}
        </Text>
        <Popover isOpen={isOpen}>
          <PopoverTrigger>
            <Button
              isDisabled={status != "unpaid"}
              onClick={open}
              w="25%"
              colorScheme="teal"
              variant="outline"
              alignSelf="center"
              _focus={{
                outline: "none",
              }}
            >
              PAY
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              _focus={{
                outline: "none",
              }}
            >
              <PopoverArrow />
              <PopoverHeader>Details</PopoverHeader>
              <PopoverCloseButton
                onClick={close}
                _focus={{
                  outline: "none",
                }}
              />
              <PopoverBody>
                <Text>Bank Accout: 551-443757-9</Text>
                <Text>PromPay: 095-158-8644</Text>
                <Text>Name: Nontapan Sitthichotlertpakdee</Text>
                <Text mt="2">Amount: {outstandingBalance}</Text>
                <Flex>
                  <Spacer />
                  <Button
                    onClick={handleSubmitClose}
                    mt="4"
                    colorScheme="blue"
                    w="max"
                    variant="outline"
                    _focus={{
                      outline: "none",
                    }}
                  >
                    Confirm
                  </Button>
                  <Spacer />
                </Flex>
              </PopoverBody>
              <PopoverFooter></PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
        {status == "pending" ? (
          <Button
            onClick={handleCancel}
            isDisabled={status != "pending"}
            mt="4"
            alignSelf="center"
            w="max"
            h="100%"
            colorScheme="red"
            variant="outline"
            _focus={{
              outline: "none",
            }}
          >
            cancel
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
