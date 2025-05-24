public with sharing class RecordViewerController {
    @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> fetchRecords(String objectType) {
        String query = '';
        if (objectType == 'Account') {
            query = 'SELECT Id, Name, Owner.Name, CreatedBy.Name, LastModifiedBy.Name, CreatedDate, LastModifiedDate, Website FROM Account ORDER BY LastModifiedDate DESC LIMIT 50';
        } else if (objectType == 'Contact') {
            query = 'SELECT Id, Name, Owner.Name, CreatedBy.Name, LastModifiedBy.Name, CreatedDate, LastModifiedDate, Phone FROM Contact ORDER BY LastModifiedDate DESC LIMIT 50';
        } else if (objectType == 'Opportunity') {
            query = 'SELECT Id, Name, Owner.Name, CreatedBy.Name, LastModifiedBy.Name, CreatedDate, LastModifiedDate, Amount FROM Opportunity ORDER BY LastModifiedDate DESC LIMIT 50';
        } else {
            return new List<Map<String, Object>>();
        }

        List<SObject> records = Database.query(query);
        List<Map<String, Object>> result = new List<Map<String, Object>>();

        for (SObject record : records) {
            Map<String, Object> mapRecord = new Map<String, Object>();
            mapRecord.put('Id', record.get('Id'));
            mapRecord.put('Name', record.get('Name'));
            mapRecord.put('Owner', record.getSObject('Owner')?.get('Name'));
            mapRecord.put('CreatedBy', record.getSObject('CreatedBy')?.get('Name'));
            mapRecord.put('LastModifiedBy', record.getSObject('LastModifiedBy')?.get('Name'));
            mapRecord.put('CreatedDate', record.get('CreatedDate'));
            mapRecord.put('LastModifiedDate', record.get('LastModifiedDate'));

            if (objectType == 'Account') {
                mapRecord.put('Website', record.get('Website'));
            } else if (objectType == 'Contact') {
                mapRecord.put('Phone', record.get('Phone'));
            } else if (objectType == 'Opportunity') {
                mapRecord.put('Amount', record.get('Amount'));
            }

            mapRecord.put('accessible', Schema.getGlobalDescribe().get(objectType).getDescribe().isAccessible());

            result.add(mapRecord);
        }

        return result;
    }
}