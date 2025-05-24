import { LightningElement, track } from 'lwc';
import fetchRecords from '@salesforce/apex/RecordViewerController.fetchRecords';
import { NavigationMixin } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import Account_Name_Field from '@salesforce/schema/Account.Name';
import Account_Website_Field from '@salesforce/schema/Account.Website';
import Contact_First_Name_Field from '@salesforce/schema/Contact.FirstName';
import Contact_Last_Name_Field from '@salesforce/schema/Contact.LastName';
import Contact_Phone_Field from '@salesforce/schema/Contact.Phone';
import Opportunity_Name_Field from '@salesforce/schema/Opportunity.Name';   
import Opportunity_Amount_Field from '@salesforce/schema/Opportunity.Amount';
import Opportunity_Stage_Field from '@salesforce/schema/Opportunity.StageName';
import Opportunity_CloseDate_Field from '@salesforce/schema/Opportunity.CloseDate';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordViewer extends NavigationMixin(LightningElement) {
    @track selectedObject = 'Account';
    @track records = [];
    @track expandedIds = new Set();
    @track objectOptions = [
        { label: 'Account', value: 'Account' },
        { label: 'Contact', value: 'Contact' },
        { label: 'Opportunity', value: 'Opportunity' }
    ];
    @track stageOptions = [
        { label: 'Prospecting', value: 'Prospecting' },
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Needs Analysis', value: 'Needs Analysis' },
        { label: 'Value Proposition', value: 'Value Proposition' },
        { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
        { label: 'Perception Analysis', value: 'Perception Analysis' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Negotiation/Review', value: 'Negotiation/Review' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
    ];
    @track showWebsiteField = false;
    @track showPhoneField = false;
    @track showAmountField = false;
    showForm = false;
    phoneField='';
    websiteField='';
    amountField='';
    firstNameField='';
    lastNameField='';
    nameField='';


    handleNameFieldChange(event) {
        this.nameField = event.target.value;
    }
    handleFirstNameFieldChange(event) {
        this.firstNameField = event.target.value;
    }
    handleLastNameFieldChange(event) {
        this.lastNameField = event.target.value;
    }
    handlePhoneFieldChange(event) {
        this.phoneField = event.target.value;
    }
    handleWebsiteFieldChange(event) {
        this.websiteField = event.target.value;
    }
    handleStageFieldChange(event) {
        this.stageField = event.target.value;
    }
    handleCloseDateFieldChange(event) {
        this.closeDateField = event.target.value;
    }
    handleAmountFieldChange(event) {
        this.amountField = event.target.value;
    }


    connectedCallback() {
       // this.getRecords();
        // const urlParams = new URLSearchParams(window.location.search);
        // const type = urlParams.get('type');
        // if (type && ['Account', 'Contact', 'Opportunity'].includes(type)) {
        //     this.selectedObject = type;
        //     this.getRecords();
        // }
    }

    handleChange(event) {
        this.selectedObject = event.target.value;
        if (this.selectedObject && this.selectedObject == 'Account') {
            this.showWebsiteField= true;
            this.showForm = true
            this.showPhoneField = false;
            this.showAmountField = false;
        }else if (this.selectedObject && this.selectedObject == 'Contact') {
            this.showPhoneField = true;
            this.showAmountField = false;
            this.showWebsiteField= false;
             this.showForm = false;
        } else if (this.selectedObject && this.selectedObject == 'Opportunity') {
            this.showAmountField = true;
            this.showForm = true
            this.showWebsiteField= false;
            this.showPhoneField = false;
        }
    }

    handleSubmit() {
        let fields = {};
        if (this.selectedObject == 'Account') {
            fields[Account_Name_Field.fieldApiName] = this.nameField;
            fields[Account_Website_Field.fieldApiName] = this.websiteField;
        } else if (this.selectedObject == 'Contact') {
            fields[Contact_First_Name_Field.fieldApiName] = this.firstNameField;
            fields[Contact_Last_Name_Field.fieldApiName] = this.lastNameField;
            fields[Contact_Phone_Field.fieldApiName] = this.phoneField;
        } else if (this.selectedObject == 'Opportunity') {
            fields[Opportunity_Name_Field.fieldApiName] = this.nameField;
            fields[Opportunity_Amount_Field.fieldApiName] = this.amountField;
            fields[Opportunity_Stage_Field.fieldApiName] = this.stageField;
            fields[Opportunity_CloseDate_Field.fieldApiName] = this.closeDateField;
        }

        const recordInput = { apiName: this.selectedObject, fields };
        createRecord(recordInput)
            .then(() => {
                this.nameField = '';
                this.firstNameField = '';
                this.lastNameField = '';
                this.phoneField = '';
                this.websiteField = '';
                this.amountField = '';
                this.stageField = '';
                this.closeDateField = '';
                this.showWebsiteField= false;
                this.showPhoneField = false;
                this.showAmountField = false;
                this.getRecords();
                this.showToast('Success', `${this.selectedObject} created successfully`, 'success');   
            })
            .catch(error => {
                this.showToast('Error creating record', error.body.message, 'error');  
            });
        
    }

    getRecords() {
        this.showForm = false;
        fetchRecords({ objectType: this.selectedObject })
            .then(result => {
                this.records = result;
            })
            .catch(error => {
                console.error('Error fetching records', error);
            });
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(evt);
    }

}