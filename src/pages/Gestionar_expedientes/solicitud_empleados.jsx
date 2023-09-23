
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { CustomerService } from '../service/CustomerService';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

export default function DataTableLazyDemo() {

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [selectedRepresentative, setSelectedRepresentative] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [fecha, setFecha] = useState(null);
    const styles = {
        field: {
            marginBottom: '1rem', // Agrega el espacio entre label e input
        },
    };
    const showDialog = () => {
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const handleEnviar = () => {
        // Lógica para enviar los datos del motivo y la fecha
        console.log('Motivo:', motivo);
        console.log('Fecha:', fecha);
        hideDialog(); // Cierra el Dialog después de enviar los datos
    };
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            'Tipo': { value: '', matchMode: 'contains' },
            'Fecha': { value: '', matchMode: 'contains' },
            'Cantidad Q.': { value: '', matchMode: 'contains' },
        }
    });

    const customerService = new CustomerService();

    let loadLazyTimeout = null;

    useEffect(() => {
        loadLazyData();
    }, [lazyParams]) // eslint-disable-line react-hooks/exhaustive-deps

    const loadLazyData = () => {
        setLoading(true);

        if (loadLazyTimeout) {
            clearTimeout(loadLazyTimeout);
        }

        //imitate delay of a backend call
        loadLazyTimeout = setTimeout(() => {
            customerService.getCustomers({ lazyEvent: JSON.stringify(lazyParams) }).then(data => {
                setTotalRecords(data.totalRecords);
                setCustomers(data.customers);
                setLoading(false);
            });
        }, Math.random() * 1000 + 250);
    }

    const onPage = (event) => {
        setLazyParams(event);
    }

    const onSort = (event) => {
        setLazyParams(event);
    }

    const onFilter = (event) => {
        event['first'] = 0;
        setLazyParams(event);
    }

    const onSelectionChange = (event) => {
        const value = event.value;
        setSelectedCustomers(value);
        setSelectAll(value.length === totalRecords);
    }

    const onSelectAllChange = (event) => {
        const selectAll = event.checked;

        if (selectAll) {
            customerService.getCustomers().then(data => {
                setSelectAll(true);
                setSelectedCustomers(data.customers);
            });
        }
        else {
            setSelectAll(false);
            setSelectedCustomers([]);
        }
    }

    const representativeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt={rowData.representative.name} src={`images/avatar/${rowData.representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span className="image-text">{rowData.representative.name}</span>
            </React.Fragment>
        );
    }

    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="/images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${rowData.country.code}`} width={30} />
                <span className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    return (
        <div>
            <br></br>
            <div className="card" style={{ padding: '1rem' }}>
                <div className='row'>
                    <h1 className='col-6' >Desembolsos Realizados</h1>
                    <div className='col-6 text-right'>
                        <Button label="Solicitar Ausencia" className="p-button-sm" onClick={showDialog} />
                    </div>
                </div>
                <br></br>
                <DataTable
                    value={customers}
                    lazy
                    filterDisplay="row"
                    responsiveLayout="scroll"
                    dataKey="id"
                    paginator
                    first={lazyParams.first}
                    rows={10}
                    totalRecords={totalRecords}
                    onPage={onPage}
                    onSort={onSort}
                    sortField={lazyParams.sortField}
                    sortOrder={lazyParams.sortOrder}
                    onFilter={onFilter}
                    filters={lazyParams.filters}
                    loading={loading}
                    selection={selectedCustomers}
                    onSelectionChange={onSelectionChange}
                    selectAll={selectAll}
                    onSelectAllChange={onSelectAllChange}
                >

                    <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                    <Column field="id" header="Código de Empleado" sortable filter filterPlaceholder="Buscar por id" />
                    <Column field="date" sortable filter header="Fecha" filterPlaceholder="Buscar por fecha" />
                    <Column
                        field="balance"
                        header="Cantidad Q."
                        sortable
                        filter
                        filterPlaceholder="Buscar por cantidad"
                        body={(rowData) => (
                            <span style={{ color: 'orange' }}>
                                Q. {parseFloat(rowData.balance).toLocaleString('es-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                        )}
                    />


                </DataTable>
            </div>
            <Dialog style={{ width: '50vw' }} header="Solicitar Ausencia" visible={dialogVisible} onHide={hideDialog}>
                <div className={'col-12'} style={styles.field}>
                    <label htmlFor="motivo">Motivo:</label>
                    <br></br>
                    <InputText style={{width:'100%'}}  id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                </div>
                <div className={'col-12'} style={styles.field}>
                    <label htmlFor="fecha">Fecha:</label>
                    <br></br>
                    <Calendar style={{width:'100%'}} id="fecha" value={fecha} onChange={(e) => setFecha(e.value)} dateFormat="dd/mm/yy" />
                </div>
                <div className="p-dialog-footer">
                    <Button label="Cancelar" icon="pi pi-times" onClick={hideDialog} />
                    <Button label="Enviar" icon="pi pi-check" onClick={handleEnviar} />
                </div>
            </Dialog>
        </div>

    );
}
