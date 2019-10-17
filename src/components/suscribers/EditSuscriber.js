import React, { Component } from 'react';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Redux y Firebase
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditSuscriber extends Component {

    //refs
    nombreRef = React.createRef();
    apellidoRef = React.createRef();
    carreraRef = React.createRef();
    codigoRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();

        const updatedSuscriber = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidoRef.current.value,
            carreraRef: this.carreraRef.current.value,
            codigoRef: this.codigoRef.current.value
        }
        
        const { suscriber, firestore, history } = this.props;

        firestore.update({
            collection: 'suscribers',
            doc: suscriber.id
        }, updatedSuscriber)
        .then(() => history.push('/suscribers'));
    }
    
    render() {
        const { suscriber } = this.props;

        if(!suscriber) return <Spinner />

        return (  
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Link to={'/suscribers'} className="btn btn-secondary">
                        <i className="fas fa-long-arrow-alt-leftmr-1"></i> Volver
                    </Link>
                </div>
                <div className="col-md-12">
                    <h2><i className="fas fa-user-plus mr-1"></i>Editar suscriptor</h2>

                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="nombre" 
                                        placeholder="Nombre del suscriptor" 
                                        required
                                        ref={this.nombreRef}
                                        defaultValue={suscriber.nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Apellido: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="apellido" 
                                        placeholder="Apellido del suscriptor" 
                                        required
                                        ref={this.apellidoRef}
                                        defaultValue={suscriber.apellido}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Carrera: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="carrera" 
                                        placeholder="Carrera" 
                                        required
                                        ref={this.carreraRef}
                                        defaultValue={suscriber.carrera}
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Codigo: </label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="codigo" 
                                        placeholder="Codigo del suscriptor" 
                                        required
                                        ref={this.codigoRef}
                                        defaultValue={suscriber.codigo}
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    value="Actualizar"
                                    className="btn btn-success"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
    
    
}
 
EditSuscriber.propTypes = {
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
)(EditSuscriber);