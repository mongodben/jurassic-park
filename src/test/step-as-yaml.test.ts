import addStepYamlAsRst from '@/parsers/giza-to-snooty/add-step-yaml-as-rst';
import path from 'path';
import { expect } from 'chai';

const testSnooty = `Configure Apple ID Authentication
---------------------------------

.. include:: /includes/steps/apple-auth-configure.rst

.. _apple-authentication-examples:`;

it('Converts Step File to Snooty RST', () => {
  const res = addStepYamlAsRst(testSnooty, 'samples');
  expect(res).to.include('1. Create an App ID');
});
