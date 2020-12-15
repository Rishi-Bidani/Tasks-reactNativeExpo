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
	{ id: "a", value: "Weekly Tasks", nav: "Weekly Tasks" },
	{ id: "b", value: "Make-A-List", nav: "List" },
	{ id: "c", value: "Time Table", nav: "Details" },
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const numColumns = 1;

import Swipeout from "react-native-swipeout";

let todayJson = require("../../list/today.json");

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

// export default function Home({ navigation }) {
// 	{
// 		/* navigation is required for navigation */
// 	}
// 	// let dynamicList = Object.keys(myList).map((key) => (
// 	// 	<Swipeout
// 	// 		right={swipeBtns}
// 	// 		autoClose={true}
// 	// 		backgroundColor="transparent"
// 	// 		key={myList[key].key}
// 	// 	>
// 	// 		<TouchableHighlight
// 	// 			key={myList[key].key}
// 	// 			onPress={() => console.log(myList[key].text)}
// 	// 			underlayColor="dodgerblue"
// 	// 		>
// 	// 			<Text style={styles.swipe}>{myList[key].text}</Text>
// 	// 		</TouchableHighlight>
// 	// 	</Swipeout>
// 	let dynamicList = Object.keys(todayJson).map((key) => (
// 		<Swipeout
// 			right={swipeBtns}
// 			autoClose={true}
// 			backgroundColor="transparent"
// 			key={todayJson[key].key}
// 		>
// 			<TouchableHighlight
// 				key={todayJson[key].key}
// 				onPress={() => console.log(todayJson[key].text)}
// 				underlayColor="dodgerblue"
// 			>
// 				<Text style={styles.swipe}>{todayJson[key].text}</Text>
// 			</TouchableHighlight>
// 		</Swipeout>
// 	));
// 	return (
// 		<View style={styles.container}>
// 			<FlatList
// 				data={data}
// 				renderItem={({ item }) => (
// 					<View style={styles1.itemContainer}>
// 						<TouchableOpacity
// 							style={styles.button1}
// 							onPress={() => navigation.navigate(item.nav)}
// 						>
// 							<Text style={styles.buttonText}>{item.value}</Text>
// 						</TouchableOpacity>
// 					</View>
// 				)}
// 				// keyExtractor={(item) => item.id}
// 				numColumns={numColumns}
// 			/>

// 			{dynamicList}
// 		</View>
// 	);
// }

// New Main Function

export default function Home({ navigation }) {
	return (
		<View style={styles.mainContainer}>
			{/* <TouchableOpacity style={styles.buttons} onPress={}>
				<Text style={styles.buttonText}>Weekly Tasks</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttons}>
				<Text style={styles.buttonText}>Make-a-List</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.buttons}>
				<Text style={styles.buttonText}>Time Table</Text>
			</TouchableOpacity> */}
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.buttons}
						onPress={() => navigation.navigate(item.nav)}
					>
						<Text style={styles.buttonText}>{item.value}</Text>
					</TouchableOpacity>
				)}
				// keyExtractor={(item) => item.id}
				numColumns={numColumns}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#212121",
	},
	buttons: {
		width: WIDTH - WIDTH / 10,
		backgroundColor: "dodgerblue",
		height: HEIGHT / 5,
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: 25,
		marginTop: WIDTH / 10,
	},
	buttonText: {
		color: "white",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "auto",
		marginBottom: "auto",
		fontSize: 28,
	},
});

// const styles1 = StyleSheet.create({
// 	itemContainer: {
// 		width: 120,
// 		height: 100,
// 		display: "flex",
// 		flexDirection: "row",
// 		justifyContent: "center",
// 	},
// });

// const styles = StyleSheet.create({
// 	list: {
// 		backgroundColor: "lightgrey",
// 	},
// 	container: {
// 		alignItems: "center",
// 		backgroundColor: "#ebebeb",
// 		marginTop: 10,
// 	},
// 	text: {
// 		color: "#333",
// 		fontSize: 24,
// 		fontWeight: "bold",
// 	},
// 	buttonContainer: {
// 		backgroundColor: "#222",
// 		borderRadius: 5,
// 		padding: 10,
// 		margin: 20,
// 	},
// 	buttonText: {
// 		flex: 1,
// 		color: "#fff",
// 		fontSize: 24,
// 		textAlign: "center",
// 		textAlignVertical: "center",
// 	},
// 	button1: {
// 		height: 100,
// 		width: 100,
// 		backgroundColor: "blue",
// 		borderRadius: 15,
// 	},
// 	button2: {
// 		height: 100,
// 		width: 100,
// 		backgroundColor: "red",
// 		borderRadius: 15,
// 	},
// 	Line: {
// 		// flex: 10,
// 		marginBottom: 10,
// 		marginTop: 10,
// 	},
// 	swipe: {
// 		width: WIDTH - 50,
// 		height: 50,
// 	},
// });
