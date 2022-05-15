import React, { useContext, useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Text,
  Box,
  Modal,
  Button,
  FormControl,
  Pressable,
  Input,
} from "native-base";
import { SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { getPageMistakesAndWarnings } from "../../utils/sqlite/getPageMistakesAndWarnings";
import { mistakesColor } from "../../assets/conts/mistakes";
import { QuranDataContext } from "../../contexts/QuranDataContext";
const PageHeader = React.memo(
  ({ data, mistakesCount, warningsCount }: any) => {
    let textColor = "#ae8f74";
    const { scrollFunc, navigation } = useContext(QuranDataContext);
    let chapterCode = data.chapterCode;
    const [pageNumber, setPageNumber] = useState(1);
    const [isInvalid, setIsInvalid] = useState(true);
    let isEven = data?.pageNumber % 2 === 0;
    const handleChange = (val) => setPageNumber(val);
    useEffect(() => {
      setIsInvalid(false);
      if (pageNumber > 604 || pageNumber < 1) {
        setIsInvalid(true);
      }
    }, [pageNumber]);
    const [showPageSelectorModal, setShowPageSelectorModal] = useState(false);

    return (
      <SafeAreaView>
        <HStack
          justifyContent={"space-between"}
          alignItems="center"
          px={2}
          // maxHeight="7"
        >
          <HStack flex={1} justifyContent="flex-start" alignItems={"center"}>
            <Pressable onPress={() => navigation.navigate("SelectSurah")}>
              <Text fontSize={"xl"} fontFamily="surahname" color={textColor}>
                {chapterCode}surah
              </Text>
            </Pressable>
            <Box
              justifyContent={"center"}
              alignItems="center"
              p="0.5"
              rounded="lg"
              backgroundColor="#f7f0e7"
              ml="1"
            >
              <Entypo name="select-arrows" size={10} color="#ae8f74" />
            </Box>
          </HStack>
          <Pressable onPress={() => setShowPageSelectorModal(true)}>
            <HStack flex={1} justifyContent="center" alignItems={"center"}>
              <Box flexDirection="row" alignItems="center" mr="2">
                {warningsCount > 0 ? (
                  <>
                    <Box
                      backgroundColor={mistakesColor.warning}
                      width="2"
                      height="2"
                      mr="0.5"
                      rounded="full"
                    />
                    <Box>
                      <Text fontSize={"xs"} fontWeight="bold" color={textColor}>
                        {warningsCount}
                      </Text>
                    </Box>
                  </>
                ) : null}
              </Box>
              <Box flexDirection="row" alignItems="center" mr="2">
                {mistakesCount > 0 ? (
                  <>
                    <Box
                      backgroundColor={mistakesColor.mistake}
                      width="2"
                      height="2"
                      mr="0.5"
                      rounded="full"
                    />
                    <Box>
                      <Text fontSize={"xs"} fontWeight="bold" color={textColor}>
                        {mistakesCount}
                      </Text>
                    </Box>
                  </>
                ) : null}
              </Box>
              <MaterialCommunityIcons
                name="book-open-blank-variant"
                size={15}
                color="#ae8f74"
                style={{
                  marginRight: 5,
                  transform: [{ scaleX: isEven ? 1 : -1 }],
                }}
              />

              <Text fontSize={"xs"} fontWeight="bold" color={textColor}>
                {data?.pageNumber}
              </Text>
              <Modal
                isOpen={showPageSelectorModal}
                onClose={() => setShowPageSelectorModal(false)}
              >
                <Modal.Content maxWidth="400px" style={{ direction: "ltr" }}>
                  <Modal.Header>
                    <Text
                      fontFamily={"montserrat"}
                      textAlign="right"
                      fontWeight="bold"
                    >
                      انتقل الى صفحة
                    </Text>
                  </Modal.Header>
                  <Modal.Body minHeight={"24"}>
                    <Input
                      placeholder="رقم الصفحة "
                      fontFamily={"montserrat"}
                      onChangeText={handleChange}
                      py="3"
                      mb={2}
                      fontSize={"sm"}
                      textAlign="right"
                      keyboardType={"number-pad"}
                    />
                    {isInvalid ? (
                      <Text
                        color="red.400"
                        fontSize="xs"
                        fontFamily={"montserrat"}
                        textAlign="right"
                      >
                        رقم الصفحة لا بد أن يكون بين 1-604
                      </Text>
                    ) : null}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setShowPageSelectorModal(false);
                        }}
                      >
                        الغاء
                      </Button>
                      <Button
                        disabled={isInvalid}
                        onPress={() => {
                          scrollFunc(pageNumber - 1);
                          setShowPageSelectorModal(false);
                        }}
                      >
                        انتقل
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
              <Box
                justifyContent={"center"}
                alignItems="center"
                p="0.5"
                rounded="lg"
                backgroundColor="#f7f0e7"
                ml="1"
              >
                <Entypo name="select-arrows" size={10} color="#ae8f74" />
              </Box>
            </HStack>
          </Pressable>

          <VStack
            flex={1}
            flexDirection="row"
            alignItems={"center"}
            justifyContent="flex-end"
          >
            <Text
              fontSize={"xs"}
              mr={2}
              color={textColor}
              fontWeight="bold"
              fontFamily={"montserrat"}
            >
              الجزء {data?.juzNumber}
            </Text>

            <Text
              fontSize={"xs"}
              color={textColor}
              fontWeight="bold"
              fontFamily={"montserrat"}
            >
              الحزب {data?.hizbNumber}
            </Text>
          </VStack>
        </HStack>
      </SafeAreaView>
    );
  },
  (p, n) => {
    return p.pageNumber !== n.pageNumber;
  }
);

export default PageHeader;
