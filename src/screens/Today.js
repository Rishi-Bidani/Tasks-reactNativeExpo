// src/screens/Details.js
import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native";
import SQLite from "react-native-sqlite-2";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

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

const db = SQLite.openDatabase("test.db", "1.0", "", 1);

export default function Today() {
	db.transaction(function (txn) {
		txn.executeSql("DROP TABLE IF EXISTS Users", []);
		txn.executeSql(
			"CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))",
			[]
		);
		txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["nora"]);
		txn.executeSql("INSERT INTO Users (name) VALUES (:name)", ["takuya"]);
		txn.executeSql("SELECT * FROM `users`", [], function (tx, res) {
			for (let i = 0; i < res.rows.length; ++i) {
				console.log("item:", res.rows.item(i));
			}
		});
	});
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
			{/* <View style={styles.bottomAdd}> */}
			<TouchableOpacity style={styles.addToday}>
				<Text style={styles.addText}>Add Task</Text>
			</TouchableOpacity>
			{/* </View> */}
		</View>
	);
}

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
