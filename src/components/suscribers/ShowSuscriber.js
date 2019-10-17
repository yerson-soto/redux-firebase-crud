import React, { Component } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux y Firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const ShowSuscriber = ({suscriber}) => {
     
    if(!suscriber) return <Spinner />

    return (  
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to={'/suscribers'} className="btn btn-secondaty">
                    <i className="fas fa-arrow-circle-left mr-1"></i>
                    Volver
                </Link>
            </div>

            <div className="col-md-6">
                <Link to={`/suscribers/edit/${suscriber.id}`} className="btn btn-primary float-right">
                    <i className="fas fa-pencil-alt mr-1"></i>
                    Editar suscriptor
                </Link>
            </div>

            <hr className="mx-5 w-100"/>

            <div className="col-12">
                <h2 className="mb-4">
                    {suscriber.nombre} {suscriber.apellido}
                </h2>

                <p>
                    <span className="font-weight-bold">
                        Carrera: {' '}
                    </span>
                    {suscriber.carrera}
                </p>

                <p>
                    <span className="font-weight-bold">
                        Codigo: {' '}
                    </span>
                    {suscriber.codigo}
                </p>
            </div>
        </div>
    );
  
}

ShowSuscriber.propTypes = {
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect(props => [{
        collection: 'suscribers',
        storeAs: 'suscriber',
        doc: props.match.params.id
    }]),
    connect(({ firestore: { ordered } }, props) => ({
        suscriber: ordered.suscriber && ordered.suscriber[0]
    }))
)(ShowSuscriber);