import React, {useLayoutEffect} from "react";
import PropTypes from 'prop-types';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number,
    pageSize: PropTypes.number,
};

const defaultProps = {
    initialPage: 1,
    pageSize: 10,
};

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pager: {}};
    }

    componentDidMount() {
        // Set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var {items, pageSize} = this.props;
        var pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // Get new paper object for specified page
        pager = this.getPager(items.length, page, pageSize);

        // Get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // Update state
        this.setState({pager: pager});

        // Call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // Default to first page
        currentPage = currentPage || 1;

        // Default page size is 10
        pageSize = pageSize || 10;

        // Calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);

        var startPages, endPages;
        if (totalPages <= 10) {
            // Less than 10 total pages so show all
            startPages = 1;
            endPages = totalPages;
        } else {
            // More than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPages = 1;
                endPages = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPages = totalPages - 9;
                endPages = totalPages;
            } else {
                startPages = currentPage - 5;
                endPages = currentPage + 4;
            }
        }

        // Calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // Create an array of pages to ng-repeat in the pager control
        var pages = [...Array((endPages + 1) - startPages).keys()].map(i => startPages + i);

        // Return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPages: startPages,
            endPages: endPages,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages,
        };
    }

    render() {
        var pager = this.state.pager;

        if (!pager.pager || pager.pages.length <= 1) {
            // Don't display pager if there is only 1 page
            return null;
        }
        return (
            <ul className="pagnation">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(1)}>First</a>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                </li>
                <li>
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )}
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                </li>
            </ul>
        )
    }
}

Pagination.protoTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;







