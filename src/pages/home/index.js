import React, { useState, useEffect } from 'react'
import {
	SafeAreaView,
	Button,
	Text,
	View,
	TextInput,
	Image,
	Share,
	Keyboard,
} from 'react-native'
import Styles from '../../components/styles'
import caoLogo from '../../../assets/icon.png'
import io from 'socket.io-client'
const ENDPOINT = "http://127.0.0.1:4001";

export default function Home({ navigation }) {
	const [name, setName] = useState('')
	const [lobbyId, setLobbyId] = useState('')
	const isExistingGame = lobbyId.length > 2

	const handleGotToLobby = () => {
		navigation.navigate('Lobby', { name, lobbyId })


	useEffect(() => {
		const socket = io(ENDPOINT, {      
			transports: ['websocket']});
		socket.connect();
		socket.on('connect', () => {
			console.log("Conectado desde front")
		})
	  }, []);

	}
	const shareOptions = {
		message: 'Hola! Te estoy invitando a jugar a CAO.',
		url: 'cao://app/lobbyId',
	}
	const onSharePress = () => Share.share(shareOptions)

	return (
		<SafeAreaView style={Styles.container}>
			<View style={Styles.titleLayoutContainer}>
				<View style={Styles.logoContainer}>
					<Image source={caoLogo} />
				</View>
				<View style={Styles.nameTitleContainer}>
					<Text style={[Styles.whiteText, Styles.mainText]}>
						{'Cards \nAgainst \nOrt'}
					</Text>
				</View>
			</View>
			<View style={Styles.spacer} />
			<View style={Styles.newGameInfoContainer}>
				<TextInput
					style={Styles.input}
					value={name}
					onChangeText={setName}
					placeholder="Name"
					onSubmitEditing={Keyboard.dismiss}
				/>
				<View style={Styles.divider} />
				<TextInput
					style={Styles.input}
					value={lobbyId}
					onChangeText={setLobbyId}
					placeholder="Lobby ID"
					onSubmitEditing={Keyboard.dismiss}
				/>
			</View>
			<View style={Styles.buttonContainer}>
				<Button
					title="Compartir LobbyID"
					color="grey"
					onPress={onSharePress}
				/>
				<Button
					title={isExistingGame ? 'Join Game' : 'New Game'}
					color={isExistingGame ? 'green' : '#63C132'}
					onPress={handleGotToLobby}
				/>
			</View>
		</SafeAreaView>
	)
}
