enum DocumentType {
    Passport,
    DriverLicense,
    IDCard
}
interface Owner {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: Date;
    documentType: DocumentType;
    documentSeries: string;
    documentNumber: string;
    printInfo(): void;
}
class Person implements Owner {

    private _lastName: string;
    private _firstName: string;
    private _middleName: string;
    private _birthDate: Date;
    private _documentType: DocumentType;
    private _documentSeries: string;
    private _documentNumber: string;
    constructor(
        lastName: string,
        firstName: string,
        middleName: string,
        birthDate: Date,
        documentType: DocumentType,
        documentSeries: string,
        documentNumber: string
    ) {
        this._lastName = lastName;
        this._firstName = firstName;
        this._middleName = middleName;
        this._birthDate = birthDate;
        this._documentType = documentType;
        this._documentSeries = documentSeries;
        this._documentNumber = documentNumber;
    }

    get lastName() { return this._lastName; }
    get firstName() { return this._firstName; }
    get middleName() { return this._middleName; }
    get birthDate() { return this._birthDate; }
    get documentType() { return this._documentType; }
    get documentSeries() { return this._documentSeries; }
    get documentNumber() { return this._documentNumber; }

    printInfo(): void {
        console.log(`Владелец: ${this.lastName} ${this.firstName} ${this.middleName}, 
        Дата рождения: ${this.birthDate.toDateString()}, 
        Документ: ${DocumentType[this.documentType]} ${this.documentSeries} ${this.documentNumber}`);
    }
}
// интерфейс Транспортное средство 
interface Vehicle {
    brand: string;
    model: string;
    year: number;
    vin: string;
    registrationNumber: string;
    owner: Owner;
    printVehicleInfo(): void;
}
class Transport implements Vehicle {

    private _brand: string;
    private _model: string;
    private _year: number;
    private _vin: string;
    private _registrationNumber: string;
    private _owner: Owner;
    constructor(
        brand: string,
        model: string,
        year: number,
        vin: string,
        registrationNumber: string,
        owner: Owner
    ) {
        this._brand = brand;
        this._model = model;
        this._year = year;
        this._vin = vin;
        this._registrationNumber = registrationNumber;
        this._owner = owner;
    }

    Геттеры
    get brand() { return this._brand; }
    get model() { return this._model; }
    get year() { return this._year; }
    get vin() { return this._vin; }
    get registrationNumber() { return this._registrationNumber; }
    get owner() { return this._owner; }

    printVehicleInfo(): void {
        console.log(`Транспортное средство: ${this.brand} ${this.model}, ${this.year},
        VIN: ${this.vin},
        Регистрационный номер: ${this.registrationNumber}`);
    }
}

// интерфейс Автомобиль 
enum CarBodyType {
    Sedan,
    SUV,
    Hatchback,
    Coupe
}
enum CarClass {
    Economy,
    Business,
    Premium
}
interface Car extends Vehicle {
    bodyType: CarBodyType;
    carClass: CarClass;
}
class Automobile extends Transport implements Car {

    private _bodyType: CarBodyType;
    private _carClass: CarClass;
    constructor(
        brand: string,
        model: string,
        year: number,
        vin: string,
        registrationNumber: string,
        owner: Owner,
        bodyType: CarBodyType,
        carClass: CarClass
    ) {
        super(brand, model, year, vin, registrationNumber, owner);
        this._bodyType = bodyType;
        this._carClass = carClass;
    }
    get bodyType() { return this._bodyType; }
    get carClass() { return this._carClass; }

    printVehicleInfo(): void {
        super.printVehicleInfo();
        console.log(`Тип кузова: ${CarBodyType[this.bodyType]}, Класс: ${CarClass[this.carClass]}`);
    }
}
interface Motorbike extends Vehicle {
    frameType: string;
    isForSport: boolean;
}
class Motorcycle extends Transport implements Motorbike {

    private _frameType: string;
    private _isForSport: boolean;
    constructor(
        brand: string,
        model: string,
        year: number,
        vin: string,
        registrationNumber: string,
        owner: Owner,
        frameType: string,
        isForSport: boolean
    ) {
        super(brand, model, year, vin, registrationNumber, owner);
        this._frameType = frameType;
        this._isForSport = isForSport;
    }
    get frameType() { return this._frameType; }
    get isForSport() { return this._isForSport; }

    printVehicleInfo(): void {
        super.printVehicleInfo();
        console.log(`Тип рамы: ${this.frameType}, 
        Для спорта: ${this.isForSport ? "Да" : "Нет"}`);
    }
}

// интерфейс Хранилище 
interface VehicleStorage<T extends Vehicle> {
    creationDate: Date;
    vehicles: T[];
    getAllVehicles(): T[];
}
class Storage<T extends Vehicle> implements VehicleStorage<T> {
    constructor(
        public creationDate: Date,
        public vehicles: T[] = []
    ) { }

    getAllVehicles(): T[] {
        return this.vehicles;
    }
}

const owner = new Person("Пекшев", "Никита", "Андреевич",
    new Date("531-424-751"), DocumentType.Passport, "1234", "1324235");
const car = new Automobile("Mitsubishi", "Volkswagen", 2077, "GFFDTHTFD2123", "457327", owner,
    CarBodyType.Coupe, CarClass.Business);
const bike = new Motorcycle("Ural", "54", 1984, "HFGHFRHH3333", "6666666", owner, "Титан", true);

const vehicleStorage = new Storage<Vehicle>(new Date());
vehicleStorage.vehicles.push(car, bike);