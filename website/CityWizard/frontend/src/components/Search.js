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
        const { data } = await axios.post("http://192.168.68.101:8000/api/getsearches/", {"search": ser});

        let results = [];

        for (let i = 0; i < data.length; i++) {
            if (i < 5) {
                results.push(data[i]);
            }
        }
        setSearchResults(results);
        return results;
    }
    function goToResults(result){
        window.location.href = "http://192.168.68.101:3000/results/"+ result.toString();
    }

    return (
        <div id="search">
            <Form.Control style={{ backgroundColor: 'transparent', color: 'white', }} type="text" placeholder="Search" onChange={(e) => {
                getSearches(e.target.value);
            }}></Form.Control>
            {searchResults.length !== 0 &&
                <div id="result-container">
                    {searchResults.map(result => {
                        return (
                            <h4 onClick={() => { 
                                goToResults(result)
                             }} class="search-result">{result}</h4>
                        )
                    })}
                </div>
            }
        </div>
    );
}