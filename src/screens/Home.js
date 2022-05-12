import { Box, Text, Pressable } from "native-base";
import React, { Component } from "react";
import { Dimensions } from "react-native";

import * as SQLite from "expo-sqlite";
import RenderPage from "../components/page/RenderPage";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/page/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        // console.log("r", r1 !== r2);
        return r1 !== r2;
      }),
      selectedPage: 1,
      showFooter: false,
      // showLoadingOverlay: false,
    };
  }

  layoutProvider = new LayoutProvider(
    (i) => {
      return 1;
    },
    (type, dim) => {
      switch (type) {
        case 1:
          dim.width = Dimensions.get("window").width;
          dim.height = Dimensions.get("window").height;
          break;
      }
    }
  );
  componentDidMount() {
    const errorCB = (t, e) => {
      console.log("error", e);
    };
    const initializePagesArray = () => {
      let pages = [];
      // initialze lines
      // make less because last surah returns empty array
      for (let i = 0; i <= 603; i++) {
        pages.push([]);
      }
      return pages;
    };
    let pages = initializePagesArray();
    const db = SQLite.openDatabase("quran.db");
    db.transaction((tx) => {
      let sqlQuery = `
                select * from page
                join line 
                on line.pageID = page.id
                join word
                on word.lineID = line.id
                order by word.lineNumber
              `;
      tx.executeSql(
        sqlQuery,
        [],
        (_, s) => {
          const rows = s.rows._array;
          // console.log("finished query");
          for (let i = 0; i < rows.length; i++) {
            pages[rows[i]?.pageNumber - 1].push(rows[i]);
          }
          // console.log("finished loop");
          if (pages) {
            this.setState({
              dataProvider: this.state.dataProvider.cloneWithRows(pages),
            });
            const checkIfPageSet = async () => {
              try {
                const value = await AsyncStorage.getItem("pageNumber");
                if (value !== null) {
                  // value previously stored
                  this.list.scrollToIndex(value);
                }
              } catch (e) {
                console.log("eror", e);
                // error reading valu
              }
            };
            checkIfPageSet();
          }
        },
        errorCB
      );
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { route } = nextProps;
    let pageNumber = 0;
    if (route?.params !== undefined) {
      pageNumber = route?.params?.pageNumber;
    }
    // init undef
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem("pageNumber", value.toString());
      } catch (e) {
        console.log(e);
      }
    };
    let prevPage = 0;
    if (this.props.route.params !== undefined) {
      prevPage = this.props.route.params.pageNumber;
    }

    if (pageNumber !== prevPage) {
      setTimeout(() => {
        storeData(pageNumber);
        // this.setState({ showLoadingOverlay: false });
      }, 1000);
      this.list.scrollToIndex(pageNumber);

      // return true
    }
    return true;
  }
  _rowRenderer = (type, data) => {
    const { width, height } = Dimensions.get("window");
    const { navigation } = this.props;

    return (
      <RenderPage
        data={data}
        width={width}
        scrollFunc={(index) => {
          this.list.scrollToIndex(index, true);
        }}
        height={height}
        navigation={navigation}
        // showFooter={(state) => {
        //   this.setState({ showFooter: !this.state.showFooter });
        // }}
      />
    );
  };
  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    // const pageNumber = route?.params?.pageNumber;
    // if (pageNumber) {
    //   this.list.scrollToIndex(100);
    // }
    const { width, height } = Dimensions.get("window");

    return (
      <Box flex={1}>
        {/* {this.state.showLoadingOverlay ? (
          <Box
            position={"absolute"}
            height={height}
            width={width}
            bg="gray.900"
            opacity={0.8}
          >
            loooading
          </Box>
        ) : null} */}
        <RecyclerListView
          // initialScrollIndex={5}
          ref={(el) => (this.list = el)}
          dataProvider={this.state.dataProvider}
          layoutProvider={this.layoutProvider}
          rowRenderer={this._rowRenderer}
          isHorizontal
          snapToInterval={width}
          decelerationRate={0}
          pagingEnabled
          disableIntervalMomentum
          scrollThrottle={16}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        />
        {this.state.showFooter ? (
          <Footer height={height} navigation={navigation} />
        ) : null}
      </Box>
    );
  }
}

export default Home;

// const Home: React.FC = () => {
//   const { width, height } = Dimensions.get("window");
//   const [pageNumber, setPageNumber] = useState(null);
//   const errorCB = (t, e: any) => {
//     console.log("error", e);
//   };

//   const initializePagesArray = () => {
//     let pages = [];
//     // initialze lines
//     for (let i = 0; i <= 10; i++) {
//       pages.push([]);
//     }
//     return pages;
//   };
//   let layoutProvider = new LayoutProvider(
//     (i) => 1,
//     (type, dim) => {
//       switch (type) {
//         case 1:
//           dim.width = width;
//           dim.height = 812;
//           break;
//       }
//     }
//   );

//   let dataProvider = new DataProvider((r1, r2) => {
//     return r1 !== r2;
//   });
//   console.log("---------------");
//   console.log("called query");
//   let pages = initializePagesArray();
//   const db = SQLite.openDatabase("quran.db");
//   const get = new Promise((resolve) => {
//     db.transaction((tx) => {
//       let sqlQuery = `
//               select * from page
//               join line
//               on line.pageID = page.id
//               join word
//               on word.lineID = line.id
//               where page.id between 1 and 2
//             `;
//       tx.executeSql(
//         sqlQuery,
//         [],
//         (_, s) => {
//           const rows = s.rows._array;
//           console.log("finished query");
//           for (let i = 0; i < rows.length; i++) {
//             pages[rows[i]?.pageNumber - 1].push(rows[i]);
//           }
//           console.log("finished loop");
//           let data = dataProvider.cloneWithRows(pages);
//           resolve(data);
//         },
//         errorCB
//       );
//     });
//   });
//   get.then((res) => {
//       console.log(res);
//       // tanzil net request 3 pages if user in page 2 render extra 3
//       return (
//         <Box mt="8" flex="1">
//           {/* <RecyclerListView
//             dataProvider={data}
//             rowRenderer={RenderPage}
//             layoutProvider={layoutProvider}
//           /> */}
//           {/* <FlatList
//             keyExtractor={(item, index) => index.toString()}
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             snapToInterval={width}
//             decelerationRate={0}
//             bounces={false}
//             data={pages}
//             renderItem={({ item, index }) => {
//               return (
//                 <RenderPage
//                   index={index}
//                   data={item}
//                   height={height}
//                   width={width}
//                 />
//               );
//             }}
//           /> */}
//         </Box>
//       );
//   });
// };
// export default Home;
