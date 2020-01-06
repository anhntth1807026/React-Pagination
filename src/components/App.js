import React from 'react';
import Pagination from "./Pagination";

class App extends React.Component{
    constructor() {
        super();

        // An example array of items to be paged
        // Dữ liệu mẫu.
        var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item' + (i+1)}));

        // Constructor
        this.state = {
            exampleItems: exampleItems,
            pageOfItem: []
        };

        // Bind function in constructor instead of render: (https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md)
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageOfItems) {
        // Update state with new page of items
        this.setState({pageOfItems: pageOfItems});
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="text-center">
                        <h1>React-Firebase-Pagination</h1>
                        {/* Đổ dữ liệu xuống dưới đây */}
                        {this.state.pageOfItems.map(items =>
                            <div key={items.id}>{items.name}</div>
                        )}
                        {/* Pagination cho page */}
                        <Pagination item={this.state.exampleItems} onChangePage={this.onChangePage}/>
                    </div>
                </div>
                <hr/>
                <div className="credits text-center">
                    <p>
                        <a href="http://jasonwatmore.com/post/2017/03/14/react-pagination-example-with-logic-like-google" target="_top">React-Firebase-Pagination</a>
                    </p>
                    <p>
                        <a href="https://github.com/anhntth1807026?tab=repositories">My Github</a>
                    </p>
                </div>
            </div>
        )
    }
}
export default App;
