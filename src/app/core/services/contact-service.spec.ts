import { ContactService } from './contact-service';
import { Contact } from '../models/contact.model';
import { of } from 'rxjs';

describe('ContactService', () => {
  let service: ContactService;
  let httpClientSpy: { post: jasmine.Spy };
  const mockContact = {
    name: 'Dayron R',
    nip: 831225,
    email: 'dtorresreyes25@gmail.com',
    address: '206 # 27717',
    web: 'www.dayronrdev.com',
  } as Contact;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ContactService(httpClientSpy as any);
  });
  it('should save a contact object and return same expected object type', () => {
    httpClientSpy.post.and.returnValue(of(mockContact));
    service.save(mockContact).subscribe((result) => {
      expect(result).toEqual(mockContact, 'expected contact');
    }, fail);
  });
});
