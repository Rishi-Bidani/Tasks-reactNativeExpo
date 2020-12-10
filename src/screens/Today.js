// src/screens/Details.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import Swipeout from "react-native-swipeout";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("data2.db");
console.log(db);

let filePath = "../../list/today.json";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

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

let testing = {
	swipe1: {
		key: 1,
		text: "Swipe1Text changed",
	},
	swipe2: {
		key: 2,
		text: "Swipe2Text",
	},
	swipe3: {
		key: 3,
		text: "Swipe3Text",
	},
};

// async function storage(data, key) {
// 	await AsyncStorage.setItem(`${key}`, JSON.stringify(data));
// }

// async function read(key) {
// 	return new Promise((resolve, reject) => {
// 		AsyncStorage.getItem(`${key}`, (err, data) => {
// 			if (err) reject(err);
// 			resolve(JSON.parse(data));
// 		});
// 	});
// }
// storage(testing, "tasks@today");

// let readStorageSwipes = read("tasks@today");

// readStorageSwipes.then((data) => {
// 	console.log(data.swipe1);
// });

// db.transaction(function (tx) {
// 	tx.executeSql("CREATE TABLE IF NOT EXISTS LOGS (id unique, log)");
// 	tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
// 	tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
// });

// db.transaction(function (tx) {
// 	tx.executeSql(
// 		"SELECT * FROM LOGS",
// 		[],
// 		function (tx, results) {
// 			var len = results.rows.length,
// 				i;
// 			for (i = 0; i < len; i++) {
// 				console.log(results.rows.item(i));
// 			}
// 		},
// 		null
// 	);
// });

function addToDB(txt, key) {
	db.transaction(function (tx) {
		tx.executeSql(
			"CREATE TABLE IF NOT EXISTS swipe (id INTEGER PRIMARY KEY AUTOINCREMENT, txt TEXT, key TEXT)"
		);
		tx.executeSql("INSERT INTO swipe (txt, key) VALUES (?, ?)", [
			`${txt}`,
			`${key}`,
		]);
	});
}

class Today extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
		};
		// using expo-sqlite --------------- currently working well

		// addToDB("testing function again", "newkey1");

		// db.transaction(function (tx) {
		// 	tx.executeSql("DROP TABLE swipe");
		// });

		db.transaction(function (tx) {
			tx.executeSql(
				"SELECT * FROM swipe",
				[],
				function (tx, results) {
					var len = results.rows.length,
						i;
					for (i = 0; i < len; i++) {
						console.log(results.rows.item(i));
					}
				},
				null
			);
		});
	}

	// ---------------------------------

	render() {
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
				<Text style={styles.text}>Today</Text>
				<View>{dynamicList}</View>
				{/* <View>{foo}</View> */}
				{/* <View style={styles.bottomAdd}> */}
				<TouchableOpacity style={styles.addToday}>
					<Text style={styles.addText}>Add Task</Text>
				</TouchableOpacity>
				{/* </View> */}
			</View>
		);
	}
}

export default Today;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ebebeb",
		height: HEIGHT,
	},
	text: {
		color: "#333",
		fontSize: 24,
		fontWeight: "bold",
	},
	addText: {
		color: "white",
		textAlign: "center",
		flex: 1,
		textAlignVertical: "center",
		fontSize: 32,
	},
	addToday: {
		height: HEIGHT / 10,
		backgroundColor: "blue",
		position: "absolute",
		bottom: HEIGHT / 11,
		width: WIDTH,
	},
	swipe: {
		width: WIDTH - 50,
		height: 50,
		backgroundColor: "lightgrey",
	},
});
