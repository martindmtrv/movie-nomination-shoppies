import React, { useEffect, useState } from "react";
import type { OMDBMovie } from "./interfaces/OMDBMovie";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay, Button, IconButton, Stack, Text, Textarea } from "@chakra-ui/react";
import "./MovieStack.css";
import { ViewIcon } from "@chakra-ui/icons";

export interface IMovieStackProps {
	movies: OMDBMovie[];
	buttonText?: string;
	onClick?: (movie: OMDBMovie) => void;
	isDisabled?: boolean;
	buttonDisabled?: (movie: OMDBMovie) => boolean;
}

const API_URL = "http://www.omdbapi.com/";
const API_KEY = "5abc59cd";

export function MovieStack({ movies, buttonText, onClick, isDisabled, buttonDisabled }: IMovieStackProps) {
	const [moviePreviewId, setMoviePreviewId] = useState<string>("");
	const [moviePreview, setMoviePreview] = useState<OMDBMovie>(null as any as OMDBMovie);

	// when previewing movie changes we need to fetch it
	useEffect(() => {
		if (moviePreviewId)
			fetch(`${API_URL}?apikey=${API_KEY}&i=${moviePreviewId}`).then(res => res.json()).then(movie => setMoviePreview(movie));
	}, [moviePreviewId]);

	return (
		<Stack overflow="auto" maxH="90%">
			{movies.map(movie => (
				<div key={movie.imdbID} className="stack-item">
					<div>
						<Text style={{display: "inline", paddingRight: 4}} isTruncated>({movie.Year}) {movie.Title}</Text>
						<IconButton size="xs" aria-label={`view ${movie.Title}`} icon={<ViewIcon />} onClick={() => setMoviePreviewId(movie.imdbID)} />
					</div>
					
					{buttonText && <Button style={{justifySelf: "end"}} disabled={isDisabled || (buttonDisabled && buttonDisabled(movie))} onClick={onClick && (() => onClick(movie))}>{buttonText}</Button>}
				</div>
			))}
			{moviePreview && (
				<AlertDialog isOpen={!!moviePreview} onClose={() => {
					setMoviePreviewId("");
					setMoviePreview(null as any as OMDBMovie);
					}} leastDestructiveRef={undefined}>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader>
								({moviePreview?.Year}){moviePreview?.Title}
							</AlertDialogHeader>
							<AlertDialogBody>
								{moviePreview && ["Genre", "Director", "Runtime", "Actors"].map(item => <Text key={item} isTruncated>{item}: {moviePreview[item]}</Text>)}
								<img src={moviePreview.Poster} />
							</AlertDialogBody>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			)}
		</Stack>
	)
}