import React from "react";
import type { OMDBMovie } from "./interfaces/OMDBMovie";
import { Button, Stack, Text } from "@chakra-ui/react";
import "./MovieStack.css";

export interface IMovieStackProps {
	movies: OMDBMovie[];
	buttonText?: string;
	onClick?: (movie: OMDBMovie) => void;
	isDisabled?: boolean;
	buttonDisabled?: (movie: OMDBMovie) => boolean;
}

export function MovieStack({ movies, buttonText, onClick, isDisabled, buttonDisabled }: IMovieStackProps) {
	return (
		<Stack overflow="auto" maxH="90%">
			{movies.map(movie => (
				<div key={movie.imdbID} className="stack-item">
					<Text style={{display: "inline"}}>{movie.Title} ({movie.Year})</Text>
					{buttonText && <Button disabled={isDisabled || (buttonDisabled && buttonDisabled(movie))} onClick={onClick && (() => onClick(movie))}>{buttonText}</Button>}
				</div>
			))}
		</Stack>
	)
}