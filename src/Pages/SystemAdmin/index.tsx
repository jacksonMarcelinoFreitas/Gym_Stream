import { DataTable } from "primereact/datatable";
import { ICreateMovement, useMovementGymUser } from './Service/'
import { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { classNames } from 'primereact/utils';
import { Calendar } from 'primereact/calendar';
import { TreeSelect } from 'primereact/treeselect';
import { format } from 'date-fns';
import { homeService } from '../Service';

interface IListGymUserResponse {
    userGymExternalId: string
    name: string;
    email: string;
    gender: string;
    dateBirth: string;
    customerGym: string;
    movementGymUser: string | null;
    numberTimesEnteredDay: number;
}

interface IListGymsResponse {
    gymExternalId: string;
    name: string;
    customer: string;
    timezone: number;
    unit: number;
}

let emptyGymUser = {
    userGymExternalId: '',
    name: '',
    email: '',
    gender: '',
    dateBirth: '',
    customerGym: '',
    movementGymUser: {
        movementGymUserExternalId: '',
        entryDateTime: '',
        departureDateTime: null,
        isDepartureDate: false,
        schedulingDepartureDateTime: {
        departureDateTime: ''
        }
    },
    numberTimesEnteredDay: 0
};
  
export function SystemAdmin() {
    useEffect(() => {
        if (window.location.pathname.startsWith('/admin')) {
          import('primereact/resources/themes/lara-light-indigo/theme.css');
          import('primereact/resources/primereact.min.css');
          import('primeicons/primeicons.css');
          import('primeflex/primeflex.css');
        }
      }, []);
  const { handleListAllUsersFromGym, handleListAllGyms, createMovementGymUser } = useMovementGymUser();
  const [ dataGymUsers, setDataGymUsers ] = useState<IListGymUserResponse[]>([])
  const [ dataGyms, setDataGyms ] = useState<IListGymsResponse[]>([])

  const [userGymDialog, setUserGymDialog] = useState(false);
  const [createUserMovementDialog, setCreateUserMovementDialog] = useState(false);
  const [userGym, setUserGym] = useState(emptyGymUser);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchListAllUsersGymData(){
        const date = homeService.getUTCTimeRange('00:00', '00:00');
        const { data } = await handleListAllUsersFromGym({
            page: 0, 
            size: 50, 
            sort: 'name,ASC', 
            startTime: date.startTime, 
            finishTime: date.finishTime
      });

      setDataGymUsers(data.content)
    }

    async function fetchAllGymsData(){
        const { data } = await handleListAllGyms({
            page: 0, 
            size: 50, 
            sort: 'name,ASC'
        })

        setDataGyms(data.content)
    }

    fetchListAllUsersGymData()
    fetchAllGymsData()
  },[]);

  // const handleEntry = (userId) => {
  //   setGymUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.userGymExternalId === userId
  //         ? {
  //             ...user,
  //             entryTime: new Date().toLocaleTimeString(),
  //             numberTimesEnteredDay: user.numberTimesEnteredDay + 1,
  //           }
  //         : user
  //     )
  //   );
  // };

  // const handleExit = (userId) => {
  //   setGymUsers((prevUsers) =>
  //     prevUsers.map((user) =>
  //       user.userGymExternalId === userId
  //         ? {
  //             ...user,
  //             exitTime: new Date().toLocaleTimeString(),
  //           }
  //         : user
  //     )
  //   );
  // };

const editUserGym = (userGymData: any) => {
    setUserGym({ ...userGymData });
    setUserGymDialog(true);
};

const createMovement = (data: ICreateMovement) => {
    const response = createMovementGymUser({ data.userGymExternalId, data.minutesToLeave, data.customerGym })
    setUserGym({ ...userGymData });
    setCreateUserMovementDialog(true);
};

const saveProduct = () => {
    setSubmitted(true);

    // if (product.name.trim()) {
    //     let _products = [...products];
    //     let _product = { ...product };

    //     if (product.id) {
    //         const index = findIndexById(product.id);

    //         _products[index] = _product;
    //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //     } else {
    //         _product.id = createId();
    //         _product.image = 'product-placeholder.svg';
    //         _products.push(_product);
    //         toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //     }

    //     setProducts(_products);
    //     userGymDialog(false);
    //     setProduct(emptyProduct);
    // }
    
};

const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setUserGym((prevUserGym) => ({
        ...prevUserGym,
        [field]: value,
    }));
};

const hideDialog = () => {
    setSubmitted(false);
    setUserGymDialog(false);
};

const hideCreateUserDialog = () => {
    setCreateUserMovementDialog(false);
};

const formatDate = (date: Date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
                            (date.getMonth() + 1).toString().padStart(2, '0')}/${
                            date.getFullYear()}`;
    return formattedDate
}

const userGymDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
);

const createUserMovementDialogFooter = (
    <React.Fragment>
        <Button label="Cancel" icon="pi pi-times" outlined onClick={hideCreateUserDialog} />
        <Button label="Criar" icon="pi pi-check" onClick={createMovement} />
    </React.Fragment>
);


  const actionBodyTemplate = (rowData) => {
      return (
          <React.Fragment>
              <Button icon="pi pi-calendar-plus" rounded text raised aria-label="EntryDateTime" className="mr-6 text-green-400" onClick={() => createMovement(rowData)}/>
              <Button icon="pi pi-calendar-minus" rounded text raised aria-label="FinishDateTime" className="mr-6 text-purple-400" onClick={() => {}} />
              <Button icon="pi pi-pencil" rounded text raised aria-label="Pencil" className="mr-6 text-teal-400" onClick={() => editUserGym(rowData)} />
              <Button icon="pi pi-trash" rounded text raised aria-label="Trash" className="mr-6 text-red-600" onClick={() => {}} />
          </React.Fragment>
      );
  };

  return (
    <>
    <DataTable value={dataGymUsers}>
        <Column field="name" header="Nome" />
        <Column field="movementGymUser.entryDateTime" header="Entrada" />
        <Column field="movementGymUser.departureDateTime." header="Saida" />
        <Column field="movementGymUser.schedulingDepartureDateTime.departureDateTime" header="Agenda" />
        <Column field="numberTimesEnteredDay" header="Nº de Entradas" />
        <Column body={actionBodyTemplate} header="Ações" />
    </DataTable>

    <Dialog 
        visible={userGymDialog} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
        header="Editar Usuário" 
        modal 
        className="p-fluid" 
        footer={userGymDialogFooter} 
        onHide={hideDialog}
    >

        <div className="field">
            <label htmlFor="customer" className="font-bold">Academia</label>
            <TreeSelect 
                value={userGym.customerGym} 
                onChange={(e) => {
                    const selectedGymCustomer = e.value as string;
                    setUserGym((prevUserGym) => ({
                      ...prevUserGym,
                      customerGym: selectedGymCustomer || '',
                    }));
                  }} 
                options={dataGyms.map((gym) => ({
                    key: gym.gymExternalId,
                    label: gym.name,
                    value: gym.customer,
                }))} 
                className="md:w-20rem w-full" 
                placeholder={userGym.customerGym ? dataGyms.find(gym => gym.customer === userGym.customerGym)?.name || 'Select Item' : 'Select Item'}
            />
        </div>

        <div className="field">
            <label htmlFor="name" className="font-bold">Nome</label>
            <InputText
                id="name"
                value={userGym.name}
                onChange={(e) => onInputChange(e, 'name')} 
                required
                autoFocus
                className={classNames({ 'p-invalid': submitted && !userGym.name })}
            />
            {submitted && !userGym.name && (
                <small className="p-error">Name is required.</small>
            )}
        </div>  

        <div className="field">
            <label htmlFor="email" className="font-bold">Email</label>
            <InputText 
                id="email" 
                value={userGym.email} 
                onChange={(e) => onInputChange(e, 'email')} 
                required 
                className={classNames({ 'p-invalid': submitted && !userGym.email })}
            />
            {submitted && !userGym.email && (
                <small className="p-error">Email is required.</small>
            )}
        </div>

        <div className="field">
            <label htmlFor="dateBirth" className="font-bold">Data de nascimento</label>
            {/* <Calendar value={userGym.dateBirth} onChange={(e) => setDate(e.value)} showIcon /> */}
            <Calendar 
                value={userGym.dateBirth ? 
                new Date(userGym.dateBirth.split('/').reverse().join('-')) : 
                null} 
                onChange={(e) => {
                    const date = e.value as Date;
                    const formattedDate = formatDate(date)
                    setUserGym((prev) => ({
                        ...prev,
                        dateBirth: formattedDate,
                    }));
                }}
                showIcon />
            {submitted && !userGym.dateBirth && <small className="p-error">DateBirth is required.</small>}
        </div> 
        
        <div className="field">
            <label className="mb-3 font-bold">Gênero</label>
            <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                <RadioButton
                    inputId="gender1"
                    name="gender"
                    value="F"
                    onChange={(e) => setUserGym((prevUserGym) => ({
                    ...prevUserGym,
                    gender: e.value,
                    }))}
                    checked={userGym.gender === 'F'}
                />
                <label htmlFor="gender1">Feminino</label>
                </div>
                <div className="field-radiobutton col-6">
                <RadioButton
                    inputId="gender2"
                    name="gender"
                    value="M"
                    onChange={(e) => setUserGym((prevUserGym) => ({
                    ...prevUserGym,
                    gender: e.value,
                    }))}
                    checked={userGym.gender === 'M'}
                />
                <label htmlFor="gender2">Masculino</label>
                </div>
            </div>
        </div>
    </Dialog>

    <Dialog 
        visible={createUserMovementDialog} 
        style={{ width: '32rem' }} 
        breakpoints={{ '960px': '75vw', '641px': '90vw' }} 
        header="Criar movimento" 
        modal 
        className="p-fluid" 
        footer={createUserMovementDialogFooter} 
        onHide={hideCreateUserDialog}
    >
        <div className="field">
            <label htmlFor="time" className="font-bold">Selecione a hora de saída</label>
            <Calendar
                value={userGym.time ? new Date(`1970-01-01T${userGym.time}`) : null}
                onChange={(e) => {
                    const time = e.value as Date;
                    const formattedTime = time.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                    });
                    setUserGym((prev) => ({
                        ...prev,
                        time: formattedTime,
                    }));
                    console.log(userGym)
                }}
                showIcon
                timeOnly
                hourFormat="24"
            />

            {submitted && !userGym.dateBirth && <small className="p-error">DateBirth is required.</small>}
        </div>
    </Dialog>
    </>
  );

};


