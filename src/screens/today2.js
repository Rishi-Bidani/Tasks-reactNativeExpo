// src/screens/list 2.js
import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	Button,
	FlatList,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
// import CheckBox from "@react-native-community/checkbox";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import {
	Card,
	Modal,
	Portal,
	Provider,
	Headline,
	Title,
	TextInput,
	// Checkbox,
} from "react-native-paper";
// import CheckBox from "@react-native-community/checkbox";

import AsyncStorage from "@react-native-async-storage/async-storage";

let data = [
	// {
	// 	id: "1",
	// 	day: "monday",
	// 	title: "First long text again which has to be really lonng aggaian",
	// 	desc: "Some desc",
	// 	time: "4pm",
	// 	color: "#ff8a80",
	// },
	// {
	// 	id: "2",
	// 	day: "monday",
	// 	title: "First long text again which has to be really lonng aggaian",
	// 	desc: "Some desc",
	// 	time: "4pm",
	// 	color: "white",
	// },
	// {
	// 	id: "3",
	// 	day: "monday",
	// 	title: "First long text again which has to be really lonng aggaian",
	// 	desc: "Some desc",
	// 	time: "4pm",
	// 	color: "white",
	// },
	// {
	// 	id: "4",
	// 	day: "monday",
	// 	title: "First long text again which has to be really lonng aggaian",
	// 	desc: "Some desc",
	// 	time: "4pm",
	// 	color: "#66BB6A",
	// },
	// {
	// 	id: "5",
	// 	day: "monday",
	// 	title: "First long text again which has to be really lonng aggaian",
	// 	desc: "Some desc",
	// 	time: "4pm",
	// 	color: "#FFEB3B",
	// },
	// {
	// 	id: "6",
	// 	day: "tuesday",
	// 	title: "Second",
	// 	desc: "Some second desc",
	// 	time: "5pm",
	// 	color: "#4FC3F7",
	// },
	// {
	// 	id: "7",
	// 	day: "monday",
	// 	title: "third",
	// 	desc: "Some second desc",
	// 	time: "5pm",
	// 	color: "white",
	// },
];

data2 = [];

class ShopList extends React.Component {
	constructor(props) {
		super(props);
		this.load();
		this.state = {
			useThisId: "",
			inputTitle: "",
			inputDesc: "",
			products: data2,
			modalsetVisible: false,
			dataModalSetVisible: false,
			whichDay: "all",
			color: "white",
		};

		this.contentForModal = {
			content: "",
		};
		this.setDataForDay(this.state.whichDay);
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
		alert("Click on the Day you wish to see");
	}
	forceUpdateHandler() {
		this.forceUpdate();
		// this.load();
	}

	setDataForDay(whichDay) {
		this.load();
		this.state.whichDay = whichDay;
		let filtered;
		if (whichDay == "all") {
			filtered = this.state.products;
			// filtered = data2;
		} else {
			filtered = this.state.products.filter((obj) => {
				return obj.day === whichDay;
			});
		}
		this.state.products = filtered;
		this.forceUpdateHandler();
	}
	capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	setThisColor(color) {
		this.state.color = color;
	}
	addToData() {
		this.textInputTitle.clear();
		this.textInputDesc.clear();
		this.state.modalsetVisible = false;
		if (this.state.inputTitle != "") {
			const addId =
				this.state.products.length >= 1
					? parseInt(this.state.products[this.state.products.length - 1].id) + 1
					: parseInt(1);

			let addNewData = {
				id: `${addId}`,
				txt: this.state.inputTxt,
				day: this.state.whichDay,
				title: this.state.inputTitle,
				desc: this.state.inputDesc,
				color: this.state.color,
			};
			this.state.products.push(addNewData);
			console.log(this.state.products);
			this.state.inputTitle = "";
			this.state.inputDesc = "";
			this.save();
			this.forceUpdateHandler();
		} else {
			this.state.products = this.state.products;
			this.save();
			this.forceUpdateHandler();
		}
	}
	deleteFromData() {
		this.state.products = this.state.products.filter(
			(obj) => obj.id !== this.contentForModal.content.id
		);
		this.state.dataModalSetVisible = false;
		this.save();
		this.forceUpdateHandler();
	}

	displayModalContent(id) {
		this.state.dataModalSetVisible = true;
		this.state.useThisId = id;
		this.contentForModal.content = this.state.products.find((obj) => {
			return obj.id == this.state.useThisId;
		});
		console.log(this.contentForModal.content.id);
		console.log(this.contentForModal.content.title);
		this.forceUpdateHandler();
	}
	async save() {
		try {
			await AsyncStorage.setItem(
				"MyWeeklyTasks",
				JSON.stringify(this.state.products)
			);
		} catch (err) {
			alert(err);
		}
	}
	async load() {
		try {
			let mydata = await AsyncStorage.getItem("MyWeeklyTasks");

			if (mydata !== null) {
				this.state.products = JSON.parse(mydata);
				data2 = JSON.parse(mydata);
				// console.log("the data", this.state.products);
				// this.setDataForDay(this.state.whichDay);
			} else {
				this.state.products = [];
				// data2 = [];
				// this.setDataForDay(this.state.whichDay);
			}
		} catch (err) {
			alert(err);
		}
		// this.setDataForDay(this.state.whichDay);
	}

	render() {
		return (
			<SafeAreaView style={styles.fullScreenContainer}>
				<Provider>
					<View style={styles.topScrollView}>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("all")}
							>
								<Text style={styles.topScrollText}>All Days</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("monday")}
							>
								<Text style={styles.topScrollText}>Monday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("tuesday")}
							>
								<Text style={styles.topScrollText}>Tuesday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("wednesday")}
							>
								<Text style={styles.topScrollText}>Wednesday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("thursday")}
							>
								<Text style={styles.topScrollText}>Thursday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("friday")}
							>
								<Text style={styles.topScrollText}>Friday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("saturday")}
							>
								<Text style={styles.topScrollText}>Saturday</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.topScrollHor}
								onPress={() => this.setDataForDay("sunday")}
							>
								<Text style={styles.topScrollText}>Sunday</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>

					{/* Code for main content */}

					<View style={{ paddingBottom: WIDTH / 4 }}>
						<FlatList
							numColumns={2}
							data={this.state.products}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={cardLayout.touchable}
									onPress={() => {
										this.displayModalContent(item.id);
									}}
								>
									<Card
										style={{
											marginLeft: 5,
											marginBottom: 5,
											backgroundColor: item.color,
										}}
									>
										<View style={styles.checkCards}>
											<Text style={cardLayout.title}>{item.title}</Text>

											<Text style={cardLayout.time}>{item.desc}</Text>
										</View>
									</Card>
								</TouchableOpacity>
							)}
						/>
					</View>

					{/* Bottom Panel Starts Here */}
					<View style={styles.bottomPanel}>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => {
								this.state.modalsetVisible = true;
								this.forceUpdateHandler();
							}}
						>
							<Image
								style={styles.plusSign}
								source={require("../../assets/appImages/plus.png")}
							/>
						</TouchableOpacity>
					</View>
					{/* Modal */}
					{/* <Provider> */}
					<Portal>
						{/* <View style={styles.modalform}> */}
						<Modal
							visible={this.state.modalsetVisible}
							onDismiss={() => {
								this.state.modalsetVisible = false;
								this.forceUpdateHandler();
							}}
							contentContainerStyle={{
								backgroundColor: "white",
								padding: 20,
								paddingTop: 0,
								zIndex: 2,
								height: HEIGHT / 2 + 10,
								marginLeft: 10,
								marginRight: 10,
							}}
						>
							<View style={modalInput.fullContainer}>
								<Headline style={modalInput.headerTitle}>
									ADD WEEKLY TASK
								</Headline>
								<View style={{ marginBottom: 10 }} />
								<Text>
									{/* <Text style={modalInput.title}>Day:</Text>{" "} */}
									<Title>Day: </Title>
									<Text>
										{this.capitalizeFirstLetter(
											this.state.whichDay == "all"
												? "All Days"
												: this.state.whichDay
										)}
									</Text>
								</Text>
								{/* <TextInput
									editable
									maxLength={200}
									placeholder="Text Here"
								></TextInput> */}
								<View style={{}}>
									<Title>Title: </Title>
									<TextInput
										selectionColor="red"
										underlineColor="red"
										maxLength={30}
										style={{ height: 40, width: WIDTH - 60 }}
										ref={(inputTitle) => {
											this.textInputTitle = inputTitle;
										}}
										onChangeText={(text) => this.setState({ inputTitle: text })}
									/>
								</View>
								<View style={{}}>
									<Title>Description </Title>
									<TextInput
										selectionColor="red"
										underlineColor="red"
										multiline={true}
										maxLength={175}
										numberOfLines={4}
										style={{ maxHeight: HEIGHT / 7, width: WIDTH - 60 }}
										ref={(inputDesc) => {
											this.textInputDesc = inputDesc;
										}}
										onChangeText={(text) => this.setState({ inputDesc: text })}
									/>
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										alignSelf: "center",
										marginTop: 3,
									}}
								>
									<TouchableOpacity
										style={chooseColor.white}
										onPress={() => this.setThisColor("white")}
									>
										<Text style={chooseColor.whiteText}>White</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={chooseColor.red}
										onPress={() => this.setThisColor("#ff8a80")}
									>
										<Text style={chooseColor.redText}>Red</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={chooseColor.green}
										onPress={() => this.setThisColor("#66BB6A")}
									>
										<Text style={chooseColor.redText}>Green</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={chooseColor.blue}
										onPress={() => this.setThisColor("#4FC3F7")}
									>
										<Text style={chooseColor.redText}>Blue</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={chooseColor.yellow}
										onPress={() => this.setThisColor("#FFEB3B")}
									>
										<Text style={chooseColor.redText}>Yellow</Text>
									</TouchableOpacity>
								</View>
								<TouchableOpacity
									style={{
										width: WIDTH / 3,
										backgroundColor: "blue",
										padding: 10,
										borderRadius: 15,
										alignSelf: "flex-end",
										marginTop: 5,
									}}
									onPress={() => this.addToData()}
								>
									<Text style={{ textAlign: "center", color: "white" }}>
										ADD
									</Text>
								</TouchableOpacity>
							</View>
						</Modal>
						{/* </View> */}
					</Portal>
					<Portal>
						<Modal
							visible={this.state.dataModalSetVisible}
							onDismiss={() => {
								this.state.dataModalSetVisible = false;
								this.forceUpdateHandler();
							}}
							contentContainerStyle={{
								backgroundColor: "white",
								padding: 20,
								paddingTop: 0,
								zIndex: 2,
								height: HEIGHT / 2 + 10,
								marginLeft: 10,
								marginRight: 10,
							}}
						>
							<View style={{ flex: 1, display: "flex" }}>
								<Title>{this.contentForModal.content.title}</Title>
								<View style={{ maxHeight: HEIGHT / 2 - 20 }}>
									<Text>{this.contentForModal.content.desc}</Text>
								</View>

								<View style={{ marginTop: "auto", alignSelf: "flex-end" }}>
									<TouchableOpacity
										style={chooseColor.red}
										onPress={() => this.deleteFromData()}
									>
										<Text style={chooseColor.redText}>Delete</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</Portal>
				</Provider>
			</SafeAreaView>
		);
	}
}

export default ShopList;

const chooseColor = StyleSheet.create({
	white: {
		width: WIDTH / 6,
		backgroundColor: "lightgrey",
		borderRadius: 25,
		padding: 10,
	},
	red: {
		width: WIDTH / 6,
		backgroundColor: "#ff8a80",
		borderRadius: 25,
		padding: 10,
	},
	green: {
		width: WIDTH / 6,
		backgroundColor: "#66BB6A",
		borderRadius: 25,
		padding: 10,
	},
	blue: {
		width: WIDTH / 6,
		backgroundColor: "#4FC3F7",
		borderRadius: 25,
		padding: 10,
	},
	yellow: {
		width: WIDTH / 6,
		backgroundColor: "#FFEB3B",
		borderRadius: 25,
		padding: 10,
	},
	redText: {
		color: "white",
		textAlign: "center",
	},
	whiteText: {
		color: "black",
	},
});

const modalInput = StyleSheet.create({
	fullContainer: {
		flex: 1,
	},
	headerTitle: {
		textAlign: "center",
		fontWeight: "bold",
		// fontSize: 18,
	},
	title: {
		fontWeight: "bold",
	},
});

const cardLayout = StyleSheet.create({
	title: {
		textAlign: "center",
		fontWeight: "bold",
	},
	time: {
		textAlign: "center",
		color: "#757575",
		marginTop: 5,
	},
	touchable: {
		alignContent: "center",
		marginTop: 5,
	},
});

const styles = StyleSheet.create({
	topScrollText: {
		textAlign: "center",
		marginTop: "auto",
		marginBottom: "auto",
		fontSize: 24,
	},
	topScrollHor: {
		width: WIDTH / 2,
		borderColor: "red",
		borderRightWidth: 1,
		flex: 1,
	},
	topScrollView: {
		height: HEIGHT / 20,
		borderColor: "red",
		borderBottomWidth: 1,
		borderTopWidth: 1,
		backgroundColor: "#4FC3F7",
	},
	checkCards: {
		width: WIDTH / 2 - 0.03 * WIDTH,
		height: HEIGHT / 4,
	},
	fullScreenContainer: {
		display: "flex",
		flex: 1,
	},
	bottomPanel: {
		marginTop: "auto",
		marginLeft: "auto",
		marginRight: "auto",
		width: WIDTH - 0.1 * WIDTH,
	},
	addButton: {
		width: WIDTH - 0.1 * WIDTH,
		height: WIDTH / 7,
		backgroundColor: "#5eb8ff",
		borderRadius: 50,
		alignSelf: "center",
		marginBottom: 5,
	},
	plusSign: {
		width: WIDTH / 9,
		height: WIDTH / 9,
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "auto",
		marginBottom: "auto",
	},
	modalform: {
		height: HEIGHT / 2,
	},
});
