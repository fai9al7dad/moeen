import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Input, Modal, Pressable, Text } from "native-base";
import { QuranDataContext } from "../../contexts/QuranDataContext";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectPageNumber = React.memo(
  ({ data, textColor }) => {
    const [showPageSelectorModal, setShowPageSelectorModal] = useState(false);
    const [isInvalid, setIsInvalid] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const { scrollFunc } = useContext(QuranDataContext);
    const isEven = data?.pageNumber % 2 === 0;

    useEffect(() => {
      setIsInvalid(false);
      if (pageNumber > 604 || pageNumber < 1) {
        setIsInvalid(true);
      }
    }, [pageNumber]);
    const handleChange = useCallback((val) => setPageNumber(val), [pageNumber]);

    return (
      <Pressable
        onPress={() => setShowPageSelectorModal(true)}
        flexDirection="row"
        alignItems="center"
        mr="2"
      >
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
      </Pressable>
    );
  },
  (p, n) => {
    return p.data.pageNumber === n.data.pageNumber;
  }
);

export default SelectPageNumber;
