import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

export default function Search() {

    const [searchResults, setSearchResults] = useState([])

    async function getSearches(ser) {
        if (ser === "") {
            setSearchResults([]);
            return [];
        }
        const { data } = await axios.get("http://autocomplete.travelpayouts.com/places2?term=" + ser + "&locale=en&types[]=country");

        let results = [];

        for (let i = 0; i < data.length; i++) {
            if (i < 5) {
                results.push(data[i].name);
            }
        }
        setSearchResults(results);
        return results;
    }

    return (
        <div id="search">
            <Form.Control type="text" placeholder="Search" onChange={(e) => {
                getSearches(e.target.value);
            }}></Form.Control>
            {searchResults.length !== 0 &&
                <div id="result-container">
                    {searchResults.map(result => {
                        return (
                            <h4 onClick={() => { console.log("clicked") }} class="search-result">{result}</h4>
                        )
                    })}
                </div>
            }
        </div>
    );
}