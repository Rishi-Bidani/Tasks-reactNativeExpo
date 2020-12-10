// src/screens/list 2.js
import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Dimensions,
	Button,
	FlatList,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import CheckBox from "@react-native-community/checkbox";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

let data = [];

class ShopList extends React.Component {
	constructor(props) {
		super(props);
		this.load();
		this.state = {
			count: 0,
			inputTxt: "",
			products: data,
		};
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		this.forceUpdate();
	}
	forceUpdateHandler() {
		this.forceUpdate();
		this.load();
	}

	handleChange = (id) => {
		let temp = this.state.products.map((product) => {
			if (id === product.id) {
				return { ...product, isChecked: !product.isChecked };
			}
			return product;
		});
		this.setState({
			products: temp,
		});
	};
	addToData() {
		if (this.state.inputTxt != "") {
			const addId =
				this.state.products.length >= 1
					? parseInt(this.state.products[this.state.products.length - 1].id) + 1
					: parseInt(1);

			let addNewData = {
				id: `${addId}`,
				txt: this.state.inputTxt,
				isChecked: false,
			};
			this.state.products.push(addNewData);
			console.log(this.state.products);
			this.state.inputTxt = "";
			this.save();
			this.forceUpdateHandler();
		} else {
			this.state.products = this.state.products;
			this.save();
			this.forceUpdateHandler();
		}
	}
	deleteFromData(arr) {
		this.state.products = this.state.products.filter(
			(e1) => !arr.some((e2) => e2.id === e1.id)
		);
		this.save();
		this.load();
		this.forceUpdateHandler();
	}
	async save() {
		try {
			await AsyncStorage.setItem("MyList", JSON.stringify(this.state.products));
		} catch (err) {
			alert(err);
		}
	}

	async load() {
		try {
			let mydata = await AsyncStorage.getItem("MyList");

			if (mydata !== null) {
				data = JSON.parse(mydata);
				console.log("the data", data);
			} else {
			}
		} catch (err) {
			alert(err);
		}
	}

	render() {
		let selected = this.state.products?.filter((product) => product.isChecked);
		return (
			<View style={styles.container}>
				{selected.length >= 1 ? (
					<TouchableHighlight
						style={styles.deleteButton}
						onPress={() => this.deleteFromData(selected)}
					>
						<Text style={{ color: "white", textAlign: "center", fontSize: 24 }}>
							Delete
						</Text>
					</TouchableHighlight>
				) : null}
				<View style={{ flex: 1 }}>
					<FlatList
						data={this.state.products}
						renderItem={({ item }) => (
							<Card style={{ margin: 5 }}>
								<View
									style={
										item.isChecked == false ? styles.card : styles.cardSelected
									}
								>
									<View style={styles.checkCards}>
										<CheckBox
											value={item.isChecked}
											onChange={() => {
												this.handleChange(item.id);
											}}
										/>

										<Text
											style={{
												textAlignVertical: "center",
												paddingRight: WIDTH / 15,
												marginRight: WIDTH / 15,
											}}
										>
											{item.txt}
										</Text>
									</View>
								</View>
							</Card>
						)}
					/>
				</View>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						marginBottom: 10,
						marginTop: 10,
					}}
				>
					<TextInput
						editable
						maxLength={200}
						style={styles.input}
						placeholder="List Item"
						ref={(input) => {
							this.textInput = input;
						}}
						onChangeText={(text) => this.setState({ inputTxt: text })}
					></TextInput>
					<TouchableOpacity
						onPress={() => {
							this.textInput.clear();
							this.addToData();
						}}
						style={styles.submit}
					>
						<Text
							style={{
								marginLeft: "auto",
								marginRight: "auto",
								marginTop: "auto",
								marginBottom: "auto",
							}}
						>
							✔
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default ShopList;

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	checkCards: {
		width: WIDTH,
		flexDirection: "row",
	},
	card: {
		padding: 10,
		margin: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#ebebeb",
	},
	text: {
		color: "#333",
		fontSize: 14,
		fontWeight: "bold",
	},
	input: {
		marginTop: "auto",
		// bottom: 10,
		color: "black",
		width: WIDTH - WIDTH / 8,
		height: 40,
		borderColor: "#7a42f4",
		borderWidth: 1,
	},
	submit: {
		backgroundColor: "lightgreen",
		width: WIDTH / 10,
		height: WIDTH / 10,
		borderRadius: 10,
		marginLeft: "auto",
		paddingLeft: "auto",
	},
	cardSelected: {
		padding: 10,
		// margin: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "lightgrey",
	},
	deleteButton: {
		backgroundColor: "red",
		padding: 5,
		borderRadius: 10,
		color: "white",
		width: WIDTH / 3,
		alignItems: "center",
	},
});
