@isTest
public class RecordViewerControllerTest {
    @isTest
    static void testFetchAccounts() {
        Account acc = new Account(Name='Test Account', Website='https://example.com');
        insert acc;

        Test.startTest();
        List<Map<String, Object>> results = RecordViewerController.fetchRecords('Account');
        Test.stopTest();

        System.assert(results.size() > 0, 'Should return at least one Account');
        System.assertEquals('Test Account', (String)results[0].get('Name'));
    }

    @isTest
    static void testFetchContacts() {
        Contact c = new Contact(FirstName='Jane', LastName='Doe', Phone='1234567890');
        insert c;

        Test.startTest();
        List<Map<String, Object>> results = RecordViewerController.fetchRecords('Contact');
        Test.stopTest();

        System.assert(results.size() > 0);
    }

    @isTest
    static void testFetchOpportunities() {
        Opportunity o = new Opportunity(Name='Big Deal', Amount=10000, StageName='Prospecting', CloseDate=System.today().addDays(30));
        insert o;

        Test.startTest();
        List<Map<String, Object>> results = RecordViewerController.fetchRecords('Opportunity');
        Test.stopTest();

        System.assert(results.size() > 0);
    }
}