// src/screens/Home.js
import React from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	TouchableHighlight,
	Dimensions,
} from "react-native";

const data = [
	{ id: "a", value: "Today", nav: "Today" },
	{ id: "b", value: "This Week", nav: "Details" },
	{ id: "c", value: "Time Table", nav: "Details" },
];

const WIDTH = Dimensions.get("window").width;
const numColumns = 3;
// const size = Dimensions.get("window").width / numColumns;
import Swipeout from "react-native-swipeout";

let todayJson = require("../../list/today.json");

console.log("yup", todayJson);

let swipeBtns = [
	{
		text: "Delete",
		backgroundColor: "red",
		underlayColor: "rgba(0, 0, 0, 1, 0.6)",
		onPress: () => {
			console.log("this");
		},
	},
];

let myList = {
	swipe1: {
		key: "1",
		text: "Swipe1Text",
	},
	swipe2: {
		key: "2",
		text: "Swipe2Text",
	},
};

let swipeText = [];

for (var key in myList) {
	var value = myList[key];
	swipeText.push(value);
}
// console.log(value.text);

export default function Home({ navigation }) {
	{
		/* navigation is required for navigation */
	}
	// let dynamicList = Object.keys(myList).map((key) => (
	// 	<Swipeout
	// 		right={swipeBtns}
	// 		autoClose={true}
	// 		backgroundColor="transparent"
	// 		key={myList[key].key}
	// 	>
	// 		<TouchableHighlight
	// 			key={myList[key].key}
	// 			onPress={() => console.log(myList[key].text)}
	// 			underlayColor="dodgerblue"
	// 		>
	// 			<Text style={styles.swipe}>{myList[key].text}</Text>
	// 		</TouchableHighlight>
	// 	</Swipeout>
	let dynamicList = Object.keys(todayJson).map((key) => (
		<Swipeout
			right={swipeBtns}
			autoClose={true}
			backgroundColor="transparent"
			key={todayJson[key].key}
		>
			<TouchableHighlight
				key={todayJson[key].key}
				onPress={() => console.log(todayJson[key].text)}
				underlayColor="dodgerblue"
			>
				<Text style={styles.swipe}>{todayJson[key].text}</Text>
			</TouchableHighlight>
		</Swipeout>
	));
	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View style={styles1.itemContainer}>
						<TouchableOpacity
							style={styles.button1}
							onPress={() => navigation.navigate(item.nav)}
						>
							<Text style={styles.buttonText}>{item.value}</Text>
						</TouchableOpacity>
						<View
							style={{
								borderBottomColor: "black",
								borderBottomWidth: 1,
								alignSelf: "stretch",
								marginTop: 20,
							}}
						/>
					</View>
				)}
				// keyExtractor={(item) => item.id}
				numColumns={numColumns}
			/>

			<Text style={styles.Line}> ──────── Upcoming Events ────────</Text>

			{/* <Swipeout right={swipeoutBtns}>
				<View>
					<Text style={styles.swipe}>Swipe me left</Text>
				</View>
			</Swipeout> */}

			{dynamicList}
		</View>
	);
}

const styles1 = StyleSheet.create({
	itemContainer: {
		width: 120,
		height: 100,
	},
});

const styles = StyleSheet.create({
	list: {
		backgroundColor: "lightgrey",
	},
	container: {
		// flex: 1,
		// justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ebebeb",
		// marginLeft: 10,
		marginTop: 10,
	},
	text: {
		color: "#333",
		fontSize: 24,
		fontWeight: "bold",
	},
	buttonContainer: {
		backgroundColor: "#222",
		borderRadius: 5,
		padding: 10,
		margin: 20,
	},
	buttonText: {
		flex: 1,
		color: "#fff",
		fontSize: 24,
		textAlign: "center",
		textAlignVertical: "center",
	},
	button1: {
		height: 100,
		width: 100,
		backgroundColor: "blue",
		borderRadius: 15,
	},
	button2: {
		height: 100,
		width: 100,
		backgroundColor: "red",
		borderRadius: 15,
	},
	Line: {
		// flex: 10,
		marginBottom: 10,
		marginTop: 10,
	},
	swipe: {
		width: WIDTH - 50,
		height: 50,
	},
});
