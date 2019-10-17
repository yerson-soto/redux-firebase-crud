import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddSuscriber extends Component {
    state = {  
        nombre: '',
        apellido: '',
        carrera: '',
        codigo: ''
    }

    handleSubmit = e => {
        e.preventDefault();

        const { nombre, apellido, carrera, codigo } = this.state;
        let newSuscriber;

        //extraer los datos del state
        if (!nombre === '' || !/\s+$/.test(nombre) || !apellido === '' || !/\s+$/.test(apellido) || !carrera === '' || !/\s+$/.test(carrera) || !codigo === '' || !/\s+$/.test(codigo)) {
            newSuscriber = {...this.state};
        }

        //extraer firestore de los props
        const { firestore, history } = this.props;

        //agregar el suscriptor
        firestore.add({collection: 'suscribers'}, newSuscriber)
            .then(() => history.push('/suscribers'))

    }

    //extraer los datos del formulario y agregarlos al state
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() { 
        return (  
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Link to={'/suscribers'} className="btn btn-secondary">
                        <i className="fas fa-long-arrow-alt-leftmr-1"></i> Volver
                    </Link>
                </div>
                <div className="col-md-12">
                    <h2><i className="fas fa-user-plus mr-1"></i>Nuevo suscriptor</h2>

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
                                        onChange={this.handleChange}
                                        value={this.state.nombre}
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
                                        onChange={this.handleChange}
                                        value={this.state.apellido}
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
                                        onChange={this.handleChange}
                                        value={this.state.carrera}
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
                                        onChange={this.handleChange}
                                        value={this.state.codigo}
                                    />
                                </div>

                                <input 
                                    type="submit" 
                                    value="Agregar"
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

AddSuscriber.propTypes = {
    firestore: PropTypes.object.isRequired,
    history: PropTypes.object
}
 
export default firestoreConnect() (AddSuscriber);