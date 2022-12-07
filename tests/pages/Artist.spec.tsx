import { render, screen } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import '../__mocks__/intersectionObserverMock';
import ArtistDetail, { getServerSideProps } from "../../pages/artist/[mbid]";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";

const tracksMock = {
    "track": [
        {
            "name": "Save Your Tears",
            "playcount": "434",
            "listeners": "217",
            "url": "https://www.last.fm/music/The+Weeknd/_/Save+Your+Tears+%2F+In+Your+Eyes+(Live+on+The+2020+American+Music+Awards)",
            "streamable": "0",
            "artist": {
                "name": "The Weeknd",
                "mbid": "c8b03190-306c-4120-bb0b-6f2ebfc06ea9",
                "url": "https://www.last.fm/music/The+Weeknd"
            },
            "image": [
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/64s/2a96cbd8b46e442fc41c2b86b821562f.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                    "size": "extralarge"
                }
            ]
        }
    ]
  } as any;

const albumsMock = {
    "album": [
        {
            "name": "Trilogy (Instrumental)",
            "playcount": "1426",
            "url": "https://www.last.fm/music/The+Weeknd/Trilogy+(Instrumental)",
            "artist": {
                "name": "The Weeknd",
                "mbid": "c8b03190-306c-4120-bb0b-6f2ebfc06ea9",
                "url": "https://www.last.fm/music/The+Weeknd"
            },
            "image": [
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/34s/ea7df0b43cb0ee72ed1308d8be5d6962.png",
                    "size": "small"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/64s/ea7df0b43cb0ee72ed1308d8be5d6962.png",
                    "size": "medium"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/174s/ea7df0b43cb0ee72ed1308d8be5d6962.png",
                    "size": "large"
                },
                {
                    "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/ea7df0b43cb0ee72ed1308d8be5d6962.png",
                    "size": "extralarge"
                }
            ]
        }
    ]
} as any;

describe("Artist", () => {
  test("should render correctly", () => {
    render(<ArtistDetail topAlbums={albumsMock.album} topTracks={tracksMock.track} mbid={"123456"}/>);

    expect(screen.getByText("Save Your Tears")).toBeInTheDocument();
  });

  test("loads initial data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ...tracksMock }));
    fetchMock.mockResponseOnce(JSON.stringify({ ...albumsMock }));
    const context = {
        params: {
            mbid: '123'
        } as ParsedUrlQuery
    }
    await getServerSideProps(context as GetServerSidePropsContext);

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});