import React, { Component } from 'react';
import { connect } from "react-redux";
import { retrieveTitles } from "./store/reducer";
import { Container, Header, Text ,Item, Input} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


// console.log('HELLO', this.props.allTitles.data.articles)

const mapStateToProps = state => {
  const { allTitles } = state;
  return { allTitles };
};

const mapDispatchToProps = dispatch => ({
  updateTitlesList: () => dispatch(retrieveTitles())
});


class ArticlesList extends React.Component {

  async componentDidMount() {
    await this.props.updateTitlesList();
  }
  const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
  
  render() {
    return (
      <Container>
        <Header />
          <Grid>
            <Row style={{ backgroundColor: '#635DB7', height: 100 }}>
              <Text>
                {dataArray.map((title,idx)=>{
                  return(
                    <Text key={idx}>
                      #{idx} {title.title} 

                    </Text>
                  )
                })}
              </Text>
            </Row>
          </Grid>
      </Container>
    );
  }

}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesList);

// function populateTitle() {
//   if(!this.props.allTitles){
//     return <Text>Loading... </Text>
//   }else{
//     <Text>
//       {this.props.allTitles.data.articles.map((title, idx) => {
//         return (
//           <Text key={idx}>
//             {idx},{title.title}
//           </Text>
//         );
//       })}
//     </Text>
//   }
// }











// import React from "react";
// import { StyleSheet, Text, View, Button } from "react-native";
// import { connect } from "react-redux";
// import { retrieveTitles } from "./store/reducer";


// class ArticlesList extends React.Component {
//   async componentDidMount() {
//     await this.props.updateTitlesList();
//     // console.log(this.props.allTitles);
//   }

//   render() {
//     return (
// //       <View style={styles.container}>
//         <Text>Our Titles will go here</Text>
        // {!this.props.allTitles ? (
        //   <Text>Nothing to read yet</Text>
        // ) : (
        //   <Text>
        //     {this.props.allTitles.data.articles.map((title, idx) => {
        //       console.log("show me title obj", title);
        //       return (
        //         <Text key={idx}>
        //           {idx},{title.title}
        //         </Text>
        //       );
        //     })}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

// const mapStateToProps = state => {
//   const { allTitles } = state;
//   return { allTitles };
// };

// const mapDispatchToProps = dispatch => ({
//   updateTitlesList: () => dispatch(retrieveTitles())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ArticlesList);
