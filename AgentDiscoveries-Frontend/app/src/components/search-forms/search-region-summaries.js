import * as React from "react";
import {
    Form,
    FormGroup,
    FormControl,
    Button,
    ControlLabel
} from "react-bootstrap";
import {ErrorMessage} from "../error-message"

import * as SearchUtils from "./search-utilities"
import SearchResult from "./search-result"
export default class RegionSummariesSearch extends React.Component {

    constructor() {
        super();
        this.state = {
            "searchForm": {},
            "errorMessage": "",
            "results": []
        }
    }

    componentWillMount() {
        this.setState({ "errorMessage": "" })
    }

    render() {
        return (
            <div className="col-md-12">
                <Form onChange={this.onSubmit.bind(this)}>
                    <h3>API Region Report Search</h3>

                    <FormGroup>
                        
                        <ErrorMessage errorMessage={this.state.errorMessage} />

                        <ControlLabel>Region ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={regionId => this.state.searchForm.regionId = regionId}
                            placeholder="enter region ID" />

                        <ControlLabel>User ID</ControlLabel>
                        <FormControl type="text"
                            inputRef={userId => this.state.searchForm.userId = userId}
                            placeholder="enter region ID" />

                        <ControlLabel>From</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={fromTime => this.state.searchForm.fromTime = fromTime}
                            defaultValue={SearchUtils.getFormDate(SearchUtils.getDateDaysAgo(7))}/>

                        <ControlLabel>To</ControlLabel>
                        <FormControl type="datetime-local"
                            inputRef={toTime => this.state.searchForm.toTime = toTime}
                            defaultValue={SearchUtils.getFormDate(new Date())} />
                    </FormGroup>
                </Form>

                <SearchResult results={this.state.results} />
            </div>
        );
    }
    
    onSubmit(e) {
        e.preventDefault();
        SearchUtils.getResultsAsynch('/v1/api/reports/regionsummaries', this.state.searchForm)
            .then(results => {
                console.log(results),
                this.setState({ "results": results, "errorMessage": "" })
            })
            .catch(error => this.setState({ "errorMessage": error }))
    }
};
