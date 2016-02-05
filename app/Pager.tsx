import * as React from 'react';
import { Component, PropTypes } from 'react';
import * as classnames from 'classnames';
import { IAction, IViewProperties, merge, action } from './common';

interface IPagerViewProperties {
    skip: number;
    take: number,
    count: number,
    pageSizes: Array<number>;
    onPreviousPage: () => void;
    onNextPage: () => void;
    onLastPage: () => void;
    onFirstPage: () => void;
    onPageSizeChanged: (number) => void;
}

export const GO_TO_FIRST_PAGE = 'GO_TO_FIRST_PAGE';
export const GO_TO_LAST_PAGE = 'GO_TO_LAST_PAGE';
export const GO_TO_NEXT_PAGE = 'GO_TO_NEXT_PAGE';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';
export const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE';

export const init = () => ({skip: 0, take: 20, count: 100})

export const update = (state: any = init(), action = null) => {
	switch(action.type) {
		case CHANGE_PAGE_SIZE:
            return merge(state, { take: action.payload, skip: 0 });

		case GO_TO_FIRST_PAGE:
            return merge(state, {skip: 0 });

		case GO_TO_LAST_PAGE: {
			const lastPage = Math.ceil(state.count / state.take);
			const newSkip = lastPage > 0 ? (lastPage-1)*state.take : 0;
			return merge(state, { skip: newSkip });
		}

		case GO_TO_NEXT_PAGE: {
			const newSkip = state.skip + state.take;
			if (newSkip > state.count) {
				return state;
			}
			return merge(state, { skip: newSkip });
		}

		case GO_TO_PREVIOUS_PAGE: {
			const newSkip = state.skip - state.take;
			if (newSkip < 0) {
				return state;
			}
			return merge(state, { skip: newSkip });
		}
	}
	return state;
};

export class View extends Component<IViewProperties, {}> {

    constructor() {
        super();
        this.onFirst = this.onFirst.bind(this);
        this.onPrevious = this.onPrevious.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onLast = this.onLast.bind(this);
    }

    onFirst() {
        this.props.dispatch(action(GO_TO_FIRST_PAGE));
    }

    onPrevious() {
        this.props.dispatch(action(GO_TO_PREVIOUS_PAGE));
    }

    onNext() {
        this.props.dispatch(action(GO_TO_NEXT_PAGE));
    }

    onLast() {
        this.props.dispatch(action(GO_TO_LAST_PAGE));
    }

    onPageSize(pageSize: number) {
        this.props.dispatch(action(CHANGE_PAGE_SIZE, pageSize));
    }

    render() {
        const {
            skip,
            take,
            count,
            pageSizes = [20, 50, 100, 200]
        } = this.props.model;

        const from = skip + 1;
        let to = skip + take;
        if (to > count) {
            to = count;
        }

        return (
            <div className="pager-component">
                <ul className="pager-component-pagination pagination">
                    <li><a href="#" onClick={this.onFirst}>&lt; &lt; </a></li>
                    <li><a href="#" onClick={this.onPrevious}>&lt; </a></li>
                    <li><span className="pagination-info">{from}-{to}/{count}</span></li>
                    <li><a href="#" onClick={this.onNext}>&gt; </a></li>
                    <li><a href="#" onClick={this.onLast}>&gt; &gt; </a></li>
                </ul>
                <select onChange={(e: any) => this.onPageSize(parseInt(e.target.value, 10)) } value={take.toString() }>
                    {pageSizes.map(i => (
                        <option key={i} value={i.toString() }>{i}</option>
                    )) }
                </select>
            </div>
        )
    }
}