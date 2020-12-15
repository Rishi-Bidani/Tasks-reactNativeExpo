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
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import CheckBox from "@react-native-community/checkbox";
import {
	TouchableHighlight,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Card, Modal, Portal, Provider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

let data = [
	{
		id: "1",
		day: "monday",
		title: "First long text again which has to be really lonng aggaian",
		desc: "Some desc",
		time: "4pm",
	},
	{
		id: "4",
		day: "monday",
		title: "First long text again which has to be really lonng aggaian",
		desc: "Some desc",
		time: "4pm",
	},
	{
		id: "5",
		day: "monday",
		title: "First long text again which has to be really lonng aggaian",
		desc: "Some desc",
		time: "4pm",
	},
	{
		id: "6",
		day: "monday",
		title: "First long text again which has to be really lonng aggaian",
		desc: "Some desc",
		time: "4pm",
	},
	{
		id: "7",
		day: "monday",
		title: "First long text again which has to be really lonng aggaian",
		desc: "Some desc",
		time: "4pm",
	},
	{
		id: "2",
		day: "tuesday",
		title: "Second",
		desc: "Some second desc",
		time: "5pm",
	},
	{
		id: "3",
		day: "monday",
		title: "third",
		desc: "Some second desc",
		time: "5pm",
	},
];

class ShopList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			count: 0,
			inputTxt: "",
			products: data,
			modalsetVisible: false,
			whichDay: "all",
		};
		// this.setDataForDay(this.state.whichDay);
		this.forceUpdateHandler = this.forceUpdateHandler.bind(this);

		this.test = "hi";
	}
	forceUpdateHandler() {
		this.forceUpdate();
	}

	setDataForDay(whichDay) {
		this.state.whichDay = whichDay;
		let filtered;
		if (whichDay == "all") {
			filtered = data;
		} else {
			filtered = data.filter((obj) => {
				return obj.day === whichDay;
			});
		}
		this.state.products = filtered;
		this.forceUpdateHandler();
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
								<TouchableOpacity style={cardLayout.touchable}>
									<Card
										style={{
											marginLeft: 5,
											marginBottom: 5,
										}}
									>
										<View style={styles.checkCards}>
											<Text style={cardLayout.title}>{item.title}</Text>

											<Text style={cardLayout.time}>Time: {item.time}</Text>
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
								zIndex: 2,
								height: HEIGHT / 2,
							}}
						>
							<Text>Example Modal. Click outside this area to dismiss.</Text>
							<TextInput
								editable
								maxLength={200}
								placeholder="Text Here"
							></TextInput>
						</Modal>
						{/* </View> */}
					</Portal>
				</Provider>
			</SafeAreaView>
		);
	}
}

export default ShopList;

const cardLayout = StyleSheet.create({
	title: {
		textAlign: "center",
		fontWeight: "bold",
	},
	time: {
		textAlign: "center",
		color: "grey",
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
