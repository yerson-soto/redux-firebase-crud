import React, { Component } from 'react';   
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

//Redux y Firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

const Suscribers = ({suscribers, firestore}) => {
    
    if (!suscribers) return <Spinner />;

    const deleteSuscriber = id => {
        //eliminar
        firestore.delete({
            collection: 'suscribers',
            doc : id
        })
    }

    return (  
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to={'/suscribers/new'} className="btn btn-primary mt-5">
                    <i className="fas fa-plus-circle"></i> Nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users"></i> Suscriptores
                </h2>
            </div>
            <table className="table table-stripped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                
                <tbody>
                    {suscribers.map(suscriber => (
                        <tr key={suscriber.id}>
                            <td>{`${suscriber.nombre} ${suscriber.apellido}`}</td>
                            <td>{suscriber.carrera}</td>
                            <td>
                                <Link to={`/suscribers/show/${suscriber.id}`} className="btn btn-success btn-block">
                                    <i className="far fa-question-circle mr-1"></i>Info
                                </Link>

                                <button type="button"
                                        className="btn btn-danger btn-block"
                                        onClick={() => deleteSuscriber(suscriber.id)}
                                >
                                    <i className="fas fa-user-minus mr-1"></i>Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
}

Suscribers.propTypes = {
    suscribers: PropTypes.array,
    firestore: PropTypes.object.isRequired
}
 
export default compose(
    firestoreConnect([{collection: 'suscribers'}]),
    connect((state, props) => ({
        suscribers: state.firestore.ordered.suscribers
    }))
)(Suscribers);