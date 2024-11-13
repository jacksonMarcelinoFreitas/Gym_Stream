import { IResourceSetting, IResourceSettingNotification } from "../../Interfaces/IResourceSetting";
import { DoughnutChart } from "../../Components/DoughnutChart";
import { INotification } from "../../Interfaces/INotification";
import { IGymOpeningHours } from "../../Interfaces/IGym";
import { Header } from "../../Components/Header";
import { CardChart } from "../../Components/CardChart";
import { CardChart2 } from "../../Components/CardChart2";
import { CardChart3 } from "../../Components/CardChart3";
import { LineChart } from "../../Components/LineChart";
import { BarChartY } from "../../Components/BarChartY";
import { BarChartX } from "../../Components/BarChartX";
import { PizzaChart } from "../../Components/PizzaChart";
import { useEffect, useRef, useState } from "react";
import { homeService } from "../Service";
import { useAuth } from "../../Hooks/auth";
import { Modal, ToggleSwitch } from "flowbite-react";
import { Button } from "../../Components/Button";
import { toast } from "react-toastify";
import TimePicker from "../../Components/Timepicker";
import { Input } from "../../Components/Input";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { webSocketService } from "../../Services/webSocketService";

export function Home() {
	const { user } = useAuth()

	const emptDataAllert = {
		startTimeUTC: "",
		endTimeUTC: "",
		numberPeople: 0,
		userExternalId: user?.externalId || "",
		customerGym: user?.customer || ""
	}

    const [openModal, setOpenModalState] = useState(false);
	const [isSaveEnabled, setIsSaveEnabled] = useState(false);
	const resourceSettingsRef = useRef<IResourceSetting[]>([]);
    const [openAlertModal, setOpenAlertModal] = useState(false);
	const [notification, setNotification] = useState<INotification>({});
    const [resourcesToUpdate, setResourcesToUpdate] = useState<string[]>([]);
	const [gymOpeningHours, setGymOpeningHours] = useState<IGymOpeningHours | null>(null);
	const [dataResourceSettings, setDataResourceSettings] = useState<IResourceSetting[]>([]);
	const [initialResourceSettings, setInitialResourceSettings] = useState<IResourceSetting[]>([]);
	const [dataSettingAllert, setDataSettingAllert] = useState<IResourceSettingNotification>(emptDataAllert);
	


	useEffect(() => {
		webSocketService.activate();
		homeService.getMovementGymUser(user);
		const subscription = homeService.gym$.subscribe((data) => {
			setGymOpeningHours(data);
		});

		return () => subscription.unsubscribe();
	}, [])

	useEffect(() => {
		if (!openAlertModal) return;

		const fetchNotification = async () => {
			try {
			const { data } = await homeService.getUserNotification(user);
			setNotification({ ...data });
			} catch (error) {
			console.error('Erro ao buscar notificações:', error);
			}
		};

		fetchNotification();
	}, [openAlertModal])

	useEffect(() => {
        const fetchAllResourceSetting = async () => {
            try {
                const response = await homeService.getUserResourceSetting(user);
                setDataResourceSettings(response);
				setInitialResourceSettings(response);
            } catch (error) {
                console.error("Erro ao buscar os recursos:", error);
            }
        };
        fetchAllResourceSetting();
    }, []);

	const handleToggleChange = (resourceId: string, newAcceptValue: boolean) => {
        setDataResourceSettings((prev) => {
            const updatedResources = prev.map((resource) =>
                resource.resourceSettingExternalId === resourceId
                    ? { ...resource, accept: newAcceptValue }
                    : resource
            );
			resourceSettingsRef.current = updatedResources;
            checkForChanges(updatedResources);
            return updatedResources;
        });

        setResourcesToUpdate((prev) => {
            if (!prev.includes(resourceId)) {
                return [...prev, resourceId];
            }
            return prev;
        });

        setResourcesToUpdate((prev) => {
            if (!prev.includes(resourceId)) {
                return [...prev, resourceId];
            }
            return prev;
        });
    };

	const checkForChanges = (updatedResources: IResourceSetting[]) => {
        const hasChanges = updatedResources.some((resource, index) => 
            resource.accept !== initialResourceSettings[index]?.accept
        );
        setIsSaveEnabled(hasChanges);
    };

	const handleActivateResource = async () => {
        if (resourcesToUpdate.length > 0) {
            try {
                const response = await homeService.setUserResourceSetting(user, resourceSettingsRef.current);
                if (response) {
                    toast.success('Recursos (des)ativados com sucesso!', {position: "bottom-center"});
                    setDataResourceSettings(response);
                    setInitialResourceSettings(response); 
                    resourceSettingsRef.current = response;
                }
                setResourcesToUpdate([]);
            } catch (error) {
                console.error("Erro ao atualizar recursos:", error);
            } finally {
                setOpenModalState(false);
            }
        } else {
            console.log("Nenhum recurso para atualizar.");
        }
    };

	const handleSubmitAllertSetting = async () => {
		try {
			const { status } = await homeService.setUserNotification(dataSettingAllert);
			if (status == 201) {
				toast.success('Alerta configurado com sucesso!');
			}
		} catch (error: any) {
			console.error("Erro ao atualizar recursos:", error);
			toast.error(error.response.data.message);
		} finally {
			setDataSettingAllert(emptDataAllert)
			setOpenAlertModal(false);
		}
	}

	const handleSubmitDeleteAllertSetting = async () => {
		try {
			const { status } = await homeService.deleteUserNotification(notification);
			if (status == 200) {
				toast.success('Alerta excluído com sucesso!', {position: "bottom-center"});
			}
		} catch (error: any) {
			console.error("Erro ao excluir notificação:", error);
			toast.error(error.response.data.message);
		} finally {
			setDataSettingAllert(emptDataAllert)
			setOpenAlertModal(false);
		}
	}

	const isAlertConfigured = initialResourceSettings.some(
		(resource) => resource.name === "Configurar alerta" && resource.accept
	);

	const handleNumberPeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDataSettingAllert((prev) => ({
			...prev,
			numberPeople: parseInt(e.target.value, 10) || 0,
		}));
	};

	const handleTimeChange = (value: string, field: string) => {
		const newValue = value; 
		setDataSettingAllert((prev) => ({
			...prev,
			[field]: newValue,
		}));
	};

	const validateAlertForm = () => {
		const startTime = dataSettingAllert.startTimeUTC;
		const endTime = dataSettingAllert.endTimeUTC;

		const isEmpty = !dataSettingAllert.numberPeople || !startTime || !endTime;

		const isInvalidTimeRange = startTime && endTime && startTime >= endTime;

		return Boolean(isEmpty || isInvalidTimeRange);
	}

	return (
		<div className="h-full bg-white">
			<Header setOpenModal={setOpenModalState} setOpenSettingAlertModal={setOpenAlertModal}  isHidden={!isAlertConfigured}/>

			<main className="bg-light-color p-4">
				<div className="flex gap-3 -bottom-6 flex-wrap">

					<div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
						<div className="rounded-xl bg-white">
							<CardChart />
						</div>
						<div className="rounded-xl bg-white">
							<CardChart2 />
						</div>
						<div className="rounded-xl bg-white sm:col-span-2 lg:col-span-1">
							<CardChart3 />
						</div>
					</div>

					{user?.role.includes('ADMIN') &&
						<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
							<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
								<LineChart />
							</div>
							<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
								<BarChartY />
							</div>
						</div>}

					{!user?.role.includes('ADMIN') &&
						<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 w-full">
							<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
								<LineChart />
							</div>
						</div>}

					{user?.role.includes('ADMIN') && <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
						<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
							<BarChartX />
						</div>

						{user?.role.includes('ADMIN') &&
							<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
								<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
									<PizzaChart />
								</div>
								<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
									<DoughnutChart />
								</div>
							</div>}		
					</div>}

					{!user?.role.includes('ADMIN') && <div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
						<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
							<BarChartX />
						</div>
						<div className="rounded-xl bg-white flex items-center justify-center" style={{ minHeight: '355px' }}>
							<BarChartY />
						</div>

						{user?.role.includes('ADMIN') &&
							<div className="grid gap-3 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<PizzaChart />
								</div>
								<div className="rounded-xl bg-white" style={{ minHeight: '355px' }}>
									<DoughnutChart />
								</div>
							</div>}		
					</div>}

				</div>
			</main>

            <Modal 
                popup
                size="md"
                show={openModal}
                onClose={() => setOpenModalState(false)}
            >
				<Modal.Header className="px-8">
				</Modal.Header>
                <Modal.Body className="flex items-center justify-center flex-col gap-6">
					<h3 className="text-orange-primary text-xl font-semibold">Recursos do sistema</h3>
					<div className="w-full p-4 flex gap-4 flex-col">
						{dataResourceSettings.map((resource) => (
							<ToggleSwitch 
								label={resource.name} 
								checked={resource?.accept || false} 
								key={resource.resourceSettingExternalId} 
								onChange={(e) => handleToggleChange(resource.resourceSettingExternalId || "", e)}
							/>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer className="flex items-center justify-center w-full">
					<Button 
						value="Salvar"
						className="w-full"
						onClick={handleActivateResource} 
						disabled={!isSaveEnabled}
					/>
				</Modal.Footer>
			</Modal>

			<Modal 
                popup
                size="md"
                show={openAlertModal}
                onClose={() => setOpenAlertModal(false)}
            >
				<Modal.Header className="px-8">
				</Modal.Header>
                <Modal.Body className="flex items-center justify-center flex-col gap-4 divide-y">
					{ Object.keys(notification).length === 0  ? 
					<>
						<h3 className="text-orange-primary text-xl font-semibold flex items-center gap-2"><HiOutlineBellAlert size={28}/>Configurar alerta</h3>
						<div className="w-full flex flex-col gap-1 mt-4">
							<p className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Hora de início</p>
							<TimePicker
								id="startTimeUTC"
								value={dataSettingAllert.startTimeUTC}
								onChange={(e) => handleTimeChange(e, 'startTimeUTC')}
								min={gymOpeningHours?.startOpeningHoursUTC}
								max={gymOpeningHours?.endOpeningHoursUTC}
								required={true}
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Hora de final</p>
							<TimePicker 
								id="endTimeUTC" 
								value={dataSettingAllert.endTimeUTC} 
								onChange={(e) => handleTimeChange(e, 'endTimeUTC')} 
								min={gymOpeningHours?.startOpeningHoursUTC}
								max={gymOpeningHours?.endOpeningHoursUTC}
								required={true} 
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<Input 
								valueLabel="Número de pessoas"
								htmlFor="numberPeople"
								id="numberPeople"
								type="number"
								onChange={handleNumberPeopleChange}
								value={dataSettingAllert?.numberPeople || undefined}
								min={0}
								max={100}
								className="border-2"
							/>
						</div>
					</> 
					:
					<>
						<h3 className="text-orange-primary text-xl font-semibold flex items-center gap-2"><HiOutlineBellAlert size={28}/>Você já tem um alerta configurado!</h3>
						<div className="w-full flex flex-col gap-1 mt-4">
							<p className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Hora de início</p>
							<TimePicker
								id="startTimeUTC"
								value={notification.startTime || ""}
								disabled
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<p className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Hora de final</p>
							<TimePicker 
								id="endTimeUTC" 
								value={notification.endTime || ""} 
								disabled
							/>
						</div>
						<div className="w-full flex flex-col gap-1">
							<Input 
								valueLabel="Número de pessoas"
								htmlFor="numberPeople"
								id="numberPeople"
								type="number"
								value={notification?.numberPeople || 0}
								className="border-2"
								disabled
							/>
						</div>
					</>
				}
				</Modal.Body>
				<Modal.Footer>
					<Button 
						value="Voltar"
						className="bg-violet-primary hover:bg-violet-600"
						onClick={()=>{setOpenAlertModal(false)}}
					/>
					{ 
						Object.keys(notification).length === 0 ? 
							<Button 
								value="Salvar"
								onClick={handleSubmitAllertSetting} 
								disabled={validateAlertForm()}
							/>
							:
							<Button 
								value="Excluir"
								onClick={handleSubmitDeleteAllertSetting} 
								className="bg-red-600 hover:bg-red-800"
							/> 
					}
				</Modal.Footer>
			</Modal>

		</div>
	);
}
