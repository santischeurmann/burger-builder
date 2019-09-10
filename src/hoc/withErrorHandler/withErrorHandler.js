import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor (props) {
            super();
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Auxilliary>
                    <Modal
                     show={this.state.error}
                     modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilliary>
            );
        }
    }
}

export default withErrorHandler;