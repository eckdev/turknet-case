import { render, screen } from "@testing-library/react";
import React from "react";
import Home, { getStaticProps } from "../../pages";
import '../__mocks__/intersectionObserverMock';
import fetchMock,{ enableFetchMocks } from 'jest-fetch-mock'
enableFetchMocks();

beforeEach(() => {
    fetchMock.resetMocks();
 })
 


const artistsMock = {
        "artists": [
            {
                "name": "Eyup",
                "playcount": "376612308",
                "listeners": "2932051",
                "mbid": "c8b03190-306c-4120-bb0b-6f2ebfc06ea9",
                "url": "https://www.last.fm/music/The+Weeknd",
                "streamable": "0",
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
                    },
                    {
                        "#text": "https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png",
                        "size": "mega"
                    }
                ]
            }
        ]
  } as any;

describe("Home", () => {
  test("should render correctly", () => {
    render(<Home artists={artistsMock.artists} />);

    expect(screen.getByText("Eyup")).toBeInTheDocument();
  });

  test("loads initial data", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ ...artistsMock }));
    await getStaticProps({});

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});