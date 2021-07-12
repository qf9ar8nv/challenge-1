import React, { useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { useChallengeState, useChallengeDispatch } from '../Model/ChallengeModel';
import { useUserState } from '../Model/UserModel';
import { API_URL } from '../../CommonVariable';

const GetChallengeContext = createContext(() => {});
const GetChallengeDetailContext = createContext(() => {});
const CreateChallengeContext = createContext(() => {});
const SaveChallengeContext = createContext(() => {});
const DeleteChallengeContext = createContext(() => {});

export const ChallengeLogicProvider = ({ children }) => {
	const challenge = useChallengeState();
	const challengeDispatch = useChallengeDispatch();
	const user = useUserState();
	console.log(user);

	useEffect(() => {
		if (user.userId !== undefined) getChallengeList();
	}, [user]);
	const getChallengeList = async () => {
		axios.get(`${API_URL}/challenge/list/${user.userId}`).then((res) => {
			challengeDispatch(res.data);
			console.log(res.data);
		})
			.catch((error) => { console.log(error); });
	};
	const getChallengeDetail = (CId) => {
		axios.get(`${API_URL}/challenge/${CId}`).then((res) => {
			console.log(res);
			return res.data;
		});
	};
	const createChallenge = async (challengeInfo) => {
		console.log(challengeInfo);
		let flag = false;
		await axios.post(`${API_URL}/challenge`, {
			userId: challengeInfo.userId,
			name: challengeInfo.name,
			challenge_start: challengeInfo.challenge_start,
			challenge_end: challengeInfo.challenge_end,
			private_key: challengeInfo.private_key
		}).then((res) => {
			flag = res.data;
		});
		return flag;
	};
	const saveChallenge = () => {

	};
	const deleteChallenge = () => {

	};
	return (
		<GetChallengeContext.Provider value={getChallengeList}>
			<GetChallengeDetailContext.Provider value={getChallengeDetail}>
				<CreateChallengeContext.Provider value={createChallenge}>
					<SaveChallengeContext.Provider value={saveChallenge}>
						<DeleteChallengeContext.Provider value={deleteChallenge}>
							{children}
						</DeleteChallengeContext.Provider>
					</SaveChallengeContext.Provider>
				</CreateChallengeContext.Provider>
			</GetChallengeDetailContext.Provider>
		</GetChallengeContext.Provider>
	);
};

export function useGetChallenge() {
	const context = useContext(GetChallengeContext);
	return context;
}

export function useGetChallengeDetail() {
	const context = useContext(GetChallengeDetailContext);
	return context;
}

export function useCreateChallenge() {
	const context = useContext(CreateChallengeContext);
	return context;
}
